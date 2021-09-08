import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../../entity/Product";
import db from "../../utils/db";
import {
    comparePassword,
    generatorToken,
    hashPassword,
} from "../../utils/helpers";

const getProducts = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await (await db)
        .getRepository(Product)
        .createQueryBuilder("product")
        .take(page_size)
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};


export { getProducts }