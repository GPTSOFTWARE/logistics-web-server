import { NextFunction, Request, Response } from "express";
import { createQueryBuilder, getRepository, InsertResult } from "typeorm";
import { City } from "../../entity/city";

export const getProvince = async (req: Request, res: Response): Promise<Response> => {

        const page = +req?.query?.page || 1;
        const page_size = +req?.query?.page_size || 10;
        const [data, total] = await getRepository(City)
                    .createQueryBuilder("city")
                    .leftJoinAndSelect('city.districts', 'district')
                    .take(page_size)
                    .skip((page - 1) * page_size)
                    .getManyAndCount();
        return res.json({ total, data });
    
};



export const getProvinceById = async (req: Request, res: Response, next: NextFunction) => {
    
    try{
        const id = req.query.id;
        const city = await getRepository(City)
        .createQueryBuilder('city')
        .leftJoinAndSelect('city.districts', 'district')
        .where('city.id = :id', {id: id})
        .getOne();
        return res.json(city);
    }
    catch (err) {
        console.error(err);
    }
};