
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Status } from "../../entity/Status";

export const getDelivery = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const delivery = await getRepository(Status)
            .createQueryBuilder('status')
            .getMany();

        res.json(delivery);
    }
    catch (err) {
        console.error(err);
    }
}

export const getDeliveryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const delivery = await getRepository(Status).findOne(id);
        res.json(delivery);
    }
    catch (err) {
        console.error(err);
    }
}