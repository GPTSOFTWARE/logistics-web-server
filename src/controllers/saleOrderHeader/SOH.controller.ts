import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../../entity/Product";
import { SaleOrder } from "../../entity/SaleOrder";
import { Account } from "../../entity/Users";
import db from "../../utils/db";
import { comparePassword } from "../../utils/helpers";

const getSaleOrder = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await (await db)
        .getRepository(SaleOrder)
        .createQueryBuilder("saleOrder")
        .leftJoinAndSelect("saleOrder.products", "product")
        .take(page_size)
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};


const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    const data = req.body.order;
    // const order = await getRepository(SaleOrder).create(data);
    let order = new SaleOrder();
    // create order object
    order = data;
    if (data.products.length > 0) {
        data.products.forEach(async (item: Product) => {
            const product = await getRepository(Product).create(item);
            if (product) {
                // data.products.push(product)
                order.products.push(product);
            }
        });
        const createOder = await getRepository(SaleOrder).save(order);
        if (!createOder) {
            return res.status(404).send('Not found');
        } else {
            return res.status(201).send(order);
        }
    } else {
        return res.status(404).send('Product not allow empty');
    }
    //create orderDetails
}
const getOrderById = async (req: Request, res: Response): Promise<Response> => {

    const id = req.params.id;
    const order = await getRepository(SaleOrder).findOne(id);

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

// const updateOrder = async (req: Request, res: Response): Promise<Response> => {


// }

export { getSaleOrder, getOrderByUserId, getOrderById, createOrder }

