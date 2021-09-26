import { NextFunction, Request, Response } from "express";
import { createQueryBuilder, getRepository, InsertResult } from "typeorm";
import { isForOfStatement } from "typescript";
import { DeliveryHistory } from "../../entity/DeliveryHistory";
import { DeliveryOrder } from "../../entity/DeliveryOrder";
import { Product } from "../../entity/Product";
import { SaleOrder } from "../../entity/SaleOrder";
import { Unit } from "../../entity/Unit";
import { Account } from "../../entity/Users";
import { ICreateOrderDTO, IUpdateOrderDTO } from "./SOH.interface";
import { Status } from "../../entity/Status";
import { mappingDTOToEntity, mappingEntityToDTO, mappingIdDown } from './SOH.mapper';
const getSaleOrder = async (req: Request, res: Response): Promise<Response> => {
    const [data, total] = await
        getRepository(SaleOrder)
            .createQueryBuilder("saleOrder")
            .leftJoinAndSelect('saleOrder.products', 'product')
            .leftJoinAndSelect('product.unit', 'unit_id')
            .leftJoinAndSelect('saleOrder.paymentMethod', 'payment')
            .leftJoinAndSelect('saleOrder.categories', 'category')
            .leftJoinAndSelect('saleOrder.unit', 'unit')
            .leftJoinAndSelect('saleOrder.deliveryOrders', 'deliveryOrders')
            .leftJoinAndSelect('deliveryOrders.status', 'status')
            .leftJoinAndSelect('deliveryOrders.deliveryHistory', 'delivery')
            .orderBy('saleOrder.createdAt', 'DESC')
            .getManyAndCount();

    return res.json({ total, data: data.map(item => mappingEntityToDTO(item)) });
};


const createOrder = async (
    req: Request<any, any, ICreateOrderDTO, any>,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body;
        const { products, typeShip, ...order } = data;

        if (order.customerPhone.length < 10 || order.receiverPhone.length < 10 || order.customerPhone.length > 11 || order.receiverPhone.length > 11) {
            res.status(400).json({ message: "invalid phone number" });
        }
        else if (order.totalPrice < 0 || order.quantity < 0) {
            res.status(400).json({ message: "invalid number" });
        }
        const result = await getRepository(SaleOrder)
            .createQueryBuilder('order')
            .insert()
            .into(SaleOrder)
            .values(order)
            .execute();

        const order_id: number = result.identifiers[0].id;

        await createQueryBuilder()
            .update(SaleOrder)
            .set({
                paymentMethod: data.payment_id,
                unit: data.unit_id,
                categories: data.orderType,
            })
            .where("id = :id", { id: order_id })
            .execute();

        const productOrder = products.map((item: any) => {
            return { saleOrder: order_id, ...item };
        });
        console.log(productOrder);



        const createProduct = await createQueryBuilder('product')
            .insert()
            .into(Product)
            .values(productOrder)
            .execute();

        // //add delivery order -- after create a order, we set it's delivery equals 1 (LK); 
        const delivery = await createQueryBuilder()
            .insert()
            .into(DeliveryOrder)
            .values({
                saleOrderId: order_id,
                statusId: 1,
                typeShip: typeShip,
            })
            .execute();

        const deliveryId: number = delivery.identifiers[0].id; // take deliveryid just created

        // const findDeli = await getRepository(DeliveryOrder).findOne(deliveryId);
        // add delivery just created into history
        const findStatus = await getRepository(Status)
            .createQueryBuilder('status')
            .andWhere('status.id = :id', { id: 1 })
            .getOne();
        await createQueryBuilder()
            .insert()
            .into(DeliveryHistory)
            .values({
                deliveryOrderId: deliveryId,
                status: findStatus.name
            })
            .execute();
        res.status(201).json({ message: 'created' });

    } catch (err) {
        console.log(err);
    }
}
const getOrderById = async (req: Request, res: Response): Promise<Response> => {

    const id = mappingIdDown(req.params.id);
    const order = await getRepository(SaleOrder)
        .createQueryBuilder('saleOrder')
        .leftJoinAndSelect('saleOrder.products', 'product')
        .leftJoinAndSelect('product.unit', 'unit_id')
        .leftJoinAndSelect('saleOrder.paymentMethod', 'payment')
        .leftJoinAndSelect('saleOrder.categories', 'Category')
        .leftJoinAndSelect('saleOrder.unit', 'unit')
        .where('saleOrder.id = :id', { id: id })
        .getOne();
    if (order) {
        return res.status(200).json(mappingEntityToDTO(order));
    }
    else {
        return res.status(404).send('Order Not Found');
    }
}

const getOrderByUserId = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const userId = await getRepository(Account).findOne(req.params.id);
    console.log(userId.phone);

    const listOrder = await getRepository(SaleOrder)
        .createQueryBuilder("order")
        .where("order.customerPhone = :phone", { phone: userId.phone })
        .orderBy('order.createdAt', 'DESC')
        .getMany();

    if (!userId) {
        return res.status(404).send("User Not Found");
    }

    if (listOrder.length > 0) {
        const dataFormat = listOrder.map(item => mappingEntityToDTO(item));
        return res.json({ listOrder: dataFormat });
    }
    return res.status(200).send("User have no order");

}


const updateOrder = async (req: Request<any, any, IUpdateOrderDTO, any>, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const { products, ...order } = data;

        const state = {
            ...order,
            id: mappingIdDown(order.id),
            unit: order.unit_id,
            categories: order.orderType,
            paymentMethod: order.payment_id
        }
        delete state.unit_id;
        delete state.orderType;
        delete state.payment_id;
        const orderWithId = await getRepository(SaleOrder)
            .createQueryBuilder('saleOrder')
            .leftJoinAndSelect('saleOrder.products', 'product')
            .leftJoinAndSelect('saleOrder.paymentMethod', 'payment')
            .leftJoinAndSelect('saleOrder.categories', 'Category')
            .leftJoinAndSelect('saleOrder.unit', 'unit')
            .leftJoinAndSelect('saleOrder.deliveryOrders', 'deliveryOrder')
            .leftJoinAndSelect('deliveryOrder.status', 'status')
            .where('saleOrder.id = :id', { id: mappingIdDown(req.params.id) })
            .getOne();
        const updateProduct = await createQueryBuilder()
            .update(SaleOrder)
            .set(state)
            .where("id = :id", { id: mappingIdDown(req.params.id) })
            .execute();

        for (let item of products) {
            const unit = await getRepository(Unit)
                .createQueryBuilder('unit')
                .where('unit.id = :id', { id: item.unit_id })
                .getOne();
            if (item.id) {
                for (let element of orderWithId.products) {
                    if (item.id === element.id) {
                        await getRepository(Product)
                            .createQueryBuilder()
                            .update(Product)
                            .set(
                                {
                                    name: item.name,
                                    quantity: item.quantity,
                                    unit: unit
                                }
                            )
                            .where("id = :id", { id: item.id })
                            .execute();
                    } else {
                        await getRepository(Product)
                            .createQueryBuilder()
                            .delete()
                            .where("id = :id", { id: element.id })
                            .execute();
                    }
                }
            }
            else {
                const product = { ...item, saleOrder: () => mappingIdDown(req.params.id).toString(), unit };
                await createQueryBuilder()
                    .insert()
                    .into(Product)
                    .values(product)
                    .execute();
            }
        }
        res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
    }
}

const softDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const deleteSoft = await getRepository(SaleOrder).softDelete(req.params.id);
        console.log(deleteSoft);
        res.json({ message: "success" });
    }
    catch (err) {
        console.log(err);
    }
}
const restoreOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const restoreOrder = await getRepository(SaleOrder).restore(req.params.id);

        const restoreDelivery = await createQueryBuilder()
            .restore()
            .from(DeliveryOrder)
            .where('saleOrderId = :id', { id: mappingIdDown(req.params.id) })
            .execute();
        res.json({ message: "success" });
    }
    catch (err) {
        console.log(err);
    }
}

const removeOrder = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const deleteOrder = await createQueryBuilder()
            .delete()
            .from(SaleOrder)
            .where("id = :id", { id: mappingIdDown(req.params.id) })
            .execute();
        res.json({ message: "success" });
    }
    catch (err) {
        console.log(err);
    }

}

const deleteMulti = async (req: Request, res: Response) => {
    try {
        const { idList } = req.body;
        let listFormat = idList?.map(item => mappingIdDown(item));
        const deleteSaleOrder = await
            createQueryBuilder()
                .softDelete()
                .from(SaleOrder)
                .where("id IN(:...ids)", { ids: listFormat })
                .execute();

        const deleteDeli = await createQueryBuilder()
            .softDelete()
            .from(DeliveryOrder)
            .where('saleOrderId IN(:...ids)', { ids: listFormat })
            .execute();
        res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
    }
}


export const getSaleOrderByOrderByTotalPrice = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const order = await getRepository(SaleOrder)
            .createQueryBuilder('order')
            .orderBy('order.totalPrice', "DESC")
            .limit(5)
            .getMany();

        res.status(200).json(order.map(item => mappingEntityToDTO(item)));
    }
    catch (err) {
        console.error(err);
    }
}

export const getOrderByPhone = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const order = await getRepository(SaleOrder)
            .createQueryBuilder('order')
            .select('order.customerPhone')
            .addSelect("COUNT(order.customerPhone)", "count")
            .groupBy('order.customerPhone')
            .orderBy("count", "DESC")
            .limit(5)
            .getRawMany();
        res.status(200).json(order.map(item => mappingEntityToDTO(item)));

    }
    catch (err) {
        console.error(err);
    }
}

export const getOrderByStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const [data, total] = await getRepository(DeliveryOrder)
            .createQueryBuilder('deli')
            .where('deli.statusId = :id', { id: req.params.id })
            .getManyAndCount();
        res.status(200).json({ total, data });
    }
    catch (err) {
        console.log(err);
    }
}

export { getSaleOrder, getOrderByUserId, getOrderById, createOrder, updateOrder, removeOrder, softDelete, restoreOrder, deleteMulti }


