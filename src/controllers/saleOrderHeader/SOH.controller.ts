import { NextFunction, Request, Response } from "express";
import { getRepository , } from "typeorm";
import { Product } from "../../entity/Product";
import { SaleOrderHeader } from "../../entity/SaleOrderHeader";
import { Account } from "../../entity/Users";
import db from "../../utils/db";

const getSaleOrderHeaders = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await (await db)
        .getRepository(SaleOrderHeader)
        .createQueryBuilder("saleOrderHeader")
        .take(page_size)
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};

// const createOrder =  async(req: Request, res: Response): Promise<Response> => {

//     const data = req.body;



// }


const getOrderById = async (req: Request, res: Response , next: NextFunction): Promise<Response> =>{

    const order = await getRepository(SaleOrderHeader).findOne(req.params.id);

    if(order){
       return   res.status(200).json(order);
    }

    return res.status(404).send('Order Not Found');
}

const getOrderByUserId = async (req: Request, res: Response , next: NextFunction): Promise<Response> => {

    const userId = await getRepository(Account).findOne(req.params.id);

    const listOrder = await getRepository(SaleOrderHeader)
                            .createQueryBuilder("order")
                            .where("order.user_id = :id",{id : userId})
                            .getManyAndCount();

    if(!userId) {
        return res.status(404).send("User Not Found");
    }
    
    if(listOrder.length > 0){
        return res.json(listOrder);
    }
    return res.status(200).send("User have no order");

}
export { getSaleOrderHeaders, getOrderByUserId }