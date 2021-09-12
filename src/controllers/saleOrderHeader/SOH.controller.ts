import { Request, Response } from "express";
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

//long
export { getSaleOrderHeaders }