import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { District } from "../../entity/district";


export const getDistrict = async (req: Request, res: Response): Promise<Response> => {

    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await getRepository(District)
                .createQueryBuilder("district")
                .leftJoinAndSelect('district.city', 'city')
                .take(page_size)
                .skip((page - 1) * page_size)
                .getManyAndCount();
    return res.json({ total, data });

};
