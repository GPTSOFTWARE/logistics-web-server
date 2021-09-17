import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Unit } from "../../entity/Unit";


export const getUnit = async (req: Request, res: Response): Promise<Response> => {

    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await getRepository(Unit)
                .createQueryBuilder("unit")
                .take(page_size)
                .skip((page - 1) * page_size)
                .getManyAndCount();
    return res.json({ total, data });

};

