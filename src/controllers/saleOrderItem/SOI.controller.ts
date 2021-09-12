import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { SaleOrderItem } from "../../entity/SaleOrderItem";
import db from "../../utils/db";

const getSaleOrderItem = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await (await db)
        .getRepository(SaleOrderItem)
        .createQueryBuilder("saleOrderItem")
        .take(page_size)
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};


export { getSaleOrderItem }