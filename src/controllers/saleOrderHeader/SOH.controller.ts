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
        .take(page_size)
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};

const mapData = async (req:Request, res:Response) =>{
    
}

const createOrder = async (req: Request, res: Response): Promise<Response> => {

    const getProduct =  getRepository(Product);
    const getOrder = getRepository(SaleOrder);

    const dataProduct = req.body.product;
    //create product 
    const product = await getProduct.create(dataProduct);
                    await getProduct.save(product);


    //create order 
    const dataOrder = req.body.order;
    const order = await getOrder.create(dataOrder);
    const saveOrder = await getOrder.save(order);

    console.log(product);
    console.log(saveOrder);
    return res.status(200);


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

export { getSaleOrder, getOrderByUserId, getOrderById , createOrder}

