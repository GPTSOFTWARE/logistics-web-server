
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Status } from "../../entity/Status";

export const getDelivery = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const delivery = await getRepository(Status)
            .createQueryBuilder('status')
            .getMany();

        res.status(200).json(delivery);
    }
    catch (err) {
        console.error(err);
    }
}

export const getDeliveryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const delivery = await getRepository(Status).findOne(id);
        if(delivery){
            res.json(delivery);
        }
        else{
            res.status(404).send("Not Found");
        }
       
    }
    catch (err) {
        console.error(err);
    }
}