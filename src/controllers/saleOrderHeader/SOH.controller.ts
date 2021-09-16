import { NextFunction, Request, Response } from "express";
import { createQueryBuilder, getRepository, InsertResult } from "typeorm";
import { DeliveryOrder } from "../../entity/DeliveryOrder";
import { Product } from "../../entity/Product";
import { ISaleOrder, SaleOrder } from "../../entity/SaleOrder";
import { Account } from "../../entity/Users";
import { comparePassword } from "../../utils/helpers";
import { updateProduct } from "../product/product.controller";
import { ICreateOrderDTO } from "./SOH.interface";

const getSaleOrder = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await
        getRepository(SaleOrder)
            .createQueryBuilder("saleOrder")
            .leftJoinAndSelect('saleOrder.products', 'product')
            .leftJoinAndSelect('saleOrder.driver', 'driver')
            .leftJoinAndSelect('saleOrder.paymentMethod', 'payment')
            .leftJoinAndSelect('saleOrder.categories', 'Category')
            .leftJoinAndSelect('saleOrder.unit', 'unit')
            .take(page_size)
            .skip((page - 1) * page_size)
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
        const { products, ...order } = data;

        const result = await getRepository(SaleOrder)
            .createQueryBuilder('order')
            .insert()
            .into(SaleOrder)
            .values([order])
            .execute();

        const order_id: number = result.identifiers[0].id;

        const productOrder = products.map((item: any) => {
            return { ...item, saleOrder: order_id };
        });

        await createQueryBuilder('product')
            .insert()
            .into(Product)
            .values(productOrder)
            .execute();
        console.log(data);

        //add delivery order -- after create a order, we set it's delivery equals 1 (LK); 
        await createQueryBuilder('delivery')
            .insert()
            .into(DeliveryOrder)
            .values({
                saleOrderId: order_id,
                deliveryId: 1
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
        .leftJoinAndSelect('saleOrder.driver', 'driver')
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

    const listOrder = await getRepository(SaleOrder)
        .createQueryBuilder("order")
        .where("order.user_id = :id", { id: userId })
        .getManyAndCount();

    if (!userId) {
        return res.status(404).send("User Not Found");
    }

    if (listOrder.length > 0) {
        return res.json(listOrder);
    }
    return res.status(200).send("User have no order");

}


const updateOrder = async (req: Request<any, any, ISaleOrder, any>, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const updateProduct = await createQueryBuilder()
            .update(SaleOrder)
            .set(data)
            .where("id = :id", { id: req.params.id })
            .execute();
        res.status(200).send(updateProduct);
    }
    catch (err) {
        console.log(err);
    }
}

const softDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const softDelete = await getRepository(SaleOrder)
            .createQueryBuilder('product')
            .where('id = :id', { id: req.params.id })
            .softDelete();
        res.json({ message: "success" });
    }
    catch (err) {
        console.log(err);
    }
}

const restoreOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const softDelete = await getRepository(SaleOrder)
            .createQueryBuilder('product')
            .where('id = :id', { id: req.params.id })
            .restore();
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



export { getSaleOrder, getOrderByUserId, getOrderById, createOrder, updateOrder, removeOrder, softDelete, restoreOrder }


