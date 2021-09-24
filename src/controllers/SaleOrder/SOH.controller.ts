import { NextFunction, Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { DeliveryOrder } from "../../entity/DeliveryOrder";
import { Product } from "../../entity/Product";
import { SaleOrder } from "../../entity/SaleOrder";
import { Unit } from "../../entity/Unit";
import { Account } from "../../entity/Users";
import { ICreateOrderDTO, IUpdateOrderDTO } from "./SOH.interface";
import { IDFORMAT } from "../../utils/constant";
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
            .orderBy('saleOrder.createdAt', 'DESC')
            .getManyAndCount();


    return res.json({ total, data });
};


const createOrder = async (
    req: Request<any, any, ICreateOrderDTO, any>,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body;
        const { products, typeShip, ...order } = data;

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
        await createQueryBuilder()
            .insert()
            .into(DeliveryOrder)
            .values({
                saleOrderId: order_id,
                statusId: 1,
                typeShip: typeShip,
            })
            .execute();
        res.status(200).json({ message: 'Success' });

    } catch (err) {
        console.log(err);
    }
}
const getOrderById = async (req: Request, res: Response): Promise<Response> => {

    const id = req.params.id;
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
        return res.status(200).json(order);
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
        return res.json(listOrder);
    }
    return res.status(200).send("User have no order");

}


const updateOrder = async (req: Request<any, any, IUpdateOrderDTO, any>, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const { products, ...order } = data;
        console.log({ data });

        const state = {
            ...order,
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
            .where('saleOrder.id = :id', { id: req.params.id })
            .getOne();
        const updateProduct = await createQueryBuilder()
            .update(SaleOrder)
            .set(state)
            .where("id = :id", { id: req.params.id })
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
                const product = { ...item, saleOrder: req.params.id, unit };
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
            .where('saleOrderId = :id', { id: req.params.id })
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
            .where("id = :id", { id: req.params.id })
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
        const deleteSaleOrder = await
            createQueryBuilder()
                .softDelete()
                .from(SaleOrder)
                .where("id IN(:...ids)", { ids: idList })
                .execute();

        const deleteDeli = await createQueryBuilder()
            .softDelete()
            .from(DeliveryOrder)
            .where('saleOrderId IN(:...ids)', { ids: idList })
            .execute();
        res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
    }
}


export const getSaleOrderByTotalPrice = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const order = await getRepository(SaleOrder)
            .createQueryBuilder('order')
            .orderBy('order.totalPrice', "DESC")
            .limit(5)
            .getMany();

        res.status(200).json(order);
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
        res.status(200).json(order);

    }
    catch (err) {
        console.error(err);
    }
}

export const getOrderByStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const statusid = req.body.statusId;

        if (statusid == 1) { // if status equal 1(LK), find saleOrder loop once
            const order = await getRepository(DeliveryOrder)
                .createQueryBuilder('order')
                .select('order.saleOrderId')
                .groupBy('order.saleOrderId')
                .having("COUNT(order.saleOrderId) = :number", { number: 1 })
                .getRawMany();
            res.status(200).json({ order: order, total: order.length });

        }
        else if (statusid == 3) { // if status equal 3(DG), find delivery which has status equal 3
            const order = await getRepository(DeliveryOrder)
                .createQueryBuilder('order')
                .where('order.statusId = :id', { id: 3 })
                .getManyAndCount();// muon hien them order thi dung getManyAndCount()
            res.status(200).json({ order: order, total: order.length });
        }
    }
    catch (err) {
        console.log(err);
    }
}

export { getSaleOrder, getOrderByUserId, getOrderById, createOrder, updateOrder, removeOrder, softDelete, restoreOrder, deleteMulti }


