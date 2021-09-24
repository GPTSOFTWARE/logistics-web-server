import { NextFunction, Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { IRequestOrder, RequestOrder } from "../../entity/RequestOrder";


export const getRequest = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await getRepository(RequestOrder)
        .createQueryBuilder("request")
        .take(page_size)
        .orderBy('request.createdAt', 'DESC')
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};
export const getAllRequest = async (req: Request, res: Response): Promise<Response> => {
    const [data, total] = await getRepository(RequestOrder)
        .createQueryBuilder("request")
        .getManyAndCount();
    return res.json({ total, data });
};

export const createRequest = async (
    req: Request<any, any, IRequestOrder, any>,
    res: Response,
    next: NextFunction) => {
    try {
        const data = req.body;
        const newRequestOrder = await createQueryBuilder()
            .insert()
            .into(RequestOrder)
            .values(data)
            .execute();
        res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
    }

};