import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { SaleOrderHeader } from "../../entity/SaleOrderHeader";
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

const createOrder= async (req: Request, res: Response , next: NextFunction): Promise<Response> => {

    
    return res.send('');
}

const getOrderById = async (req: Request, res: Response , next: NextFunction): Promise<Response> =>{

    const order = await getRepository(SaleOrderHeader).findOne(req.params.id);

    if(order){
       return   res.status(200).json(order);
    }

    return res.status(404).send('Order Not Found');
}





export { getSaleOrderHeaders }