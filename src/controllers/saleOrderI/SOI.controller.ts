import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { SaleOrderI } from "../../entity/SaleOrderI";
import db from "../../utils/db";

const getSaleOrderI = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await (await db)
        .getRepository(SaleOrderI)
        .createQueryBuilder("SaleOrderI")
        .take(page_size)
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};


export { getSaleOrderI }