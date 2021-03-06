import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { PaymentMethod } from "../../entity/payment";

export const getPayment = async (req: Request, res: Response): Promise<Response> => {
    const [data, total] = await getRepository(PaymentMethod)
        .createQueryBuilder("payment")
        .getManyAndCount();
    return res.json({ total, data });

};

