
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { DeliveryHistory } from "../../entity/DeliveryHistory";
import { DeliveryOrder } from "../../entity/DeliveryOrder";
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

export const getHistoryDelivery = async (req: Request, res: Response, next: NextFunction) =>{ //see history delivery
    try{
        const delivery = await getRepository(DeliveryOrder)
                                            .createQueryBuilder('deli')
                                            .leftJoinAndSelect('deli.driver','driver')
                                            .leftJoinAndSelect('deli.deliveryHistory', 'delivery')
                                            .where('deli.id = :id ', {id : req.params.id})
                                            .getMany();
        if(!delivery){
            res.status(404).json({message: "NOT FOUND"})
        }

        res.status(200).json(delivery);
    }
    catch(err) {
        console.log(err);
    }
}