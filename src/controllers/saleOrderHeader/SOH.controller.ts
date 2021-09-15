import { NextFunction, Request, Response } from "express";
import { createQueryBuilder, getRepository, InsertResult } from "typeorm";
import { Product } from "../../entity/Product";
import { SaleOrder } from "../../entity/SaleOrder";
import { Account } from "../../entity/Users";
import { comparePassword } from "../../utils/helpers";
import { ICreateOrderDTO } from "./SOH.interface";

const getSaleOrder = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await 
        getRepository(SaleOrder)
        .createQueryBuilder("saleOrder")
        .leftJoinAndSelect("saleOrder.products", "product")
        .take(page_size)
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};


const createOrder = async (
    req: Request<any, any, ICreateOrderDTO,any >,
    res: Response,
    next: NextFunction
    )=> {
    try{
        const data = req.body;
        const{products, ...order} = data;

        const result =  await getRepository(SaleOrder)
                        .createQueryBuilder('order')
                        .insert()
                        .into(SaleOrder)
                        .values([order])
                        .execute();

        const order_id:number = result.identifiers[0].id;

        const productOrder = products.map((item:any) =>{
            return {...item, saleOrder: order_id};
        });

        await createQueryBuilder('product')
                .insert()
                .into(Product)
                .values(productOrder)
                .execute();
                res.status(200).json({message:'Success'});
        console.log(data);        

    }catch (err) {
        console.log(err);
    } 
}
const getOrderById = async (req: Request, res: Response): Promise<Response> => {

    const id   = req.params.id;
    const order = await getRepository(SaleOrder)
                        .createQueryBuilder('order')
                        .leftJoinAndSelect('order.products', 'product')
                        .where('order.id = :id',{id : id})
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

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
     
}


export { getSaleOrder,  getOrderByUserId, getOrderById, createOrder }


