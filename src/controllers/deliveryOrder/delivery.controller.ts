
import { Request, Response, NextFunction } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { DeliveryHistory } from "../../entity/DeliveryHistory";
import { DeliveryOrder } from "../../entity/DeliveryOrder";
import { Status } from "../../entity/Status";
import checkRoles from "../../middleware/role.middleware";
import { mappingEntityToDTO } from './DO.mapper';

export const getDelivery = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const check = await checkRoles(req, res);
        if(check){
            const delivery = await getRepository(Status)
            .createQueryBuilder('status')
            .getMany();

            res.status(200).json(delivery);
        }
        else{
            return res.status(403).json({ message: "NOT PERMISTION" });
        }
    }
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export const getDeliveryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const check = await checkRoles(req, res);
        if(check){
            const id = req.params.id;
            const delivery = await getRepository(Status).findOne(id);
            if (delivery) {
                res.json(delivery);
            }
            else {
                res.status(404).send("Not Found");
            }
        }
        else{
            return res.status(403).json({ message: "NOT PERMISTION" });
        }
    }
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export const getHistoryDelivery = async (req: Request, res: Response, next: NextFunction) => { //see history delivery
    try {
        const check = await checkRoles(req, res);
        if(check){
            const delivery = await getRepository(DeliveryOrder)
                        .createQueryBuilder('deli')
                        .leftJoinAndSelect('deli.driver', 'driver')
                        .leftJoinAndSelect('deli.deliveryHistory', 'delivery')
                        .where('deli.id = :id ', { id: req.params.id })
                        .getMany();
            if (!delivery) {
                res.status(404).json({ message: "NOT FOUND" })
            }
            res.status(200).json({ delivery: delivery.map(item => mappingEntityToDTO(item)) });
        }
        else{
            return res.status(403).json({ message: "NOT PERMISTION" });
        }
    }
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"});

    }
};

export const getHistoryDetails = async (req: Request, res: Response, next: NextFunction) => { //see history delivery
    try {
        const check = await checkRoles(req, res);
        if(check){
            const delivery = await getRepository(DeliveryHistory)
                        .createQueryBuilder('deli')
                        .where('deli.deliveryOrderId = :deliveryId ', { deliveryId: req.params.id })
                        // .groupBy('deli.deliveryOrderId')
                        // .orderBy('deli.id')
                        .getMany();
            if (!delivery) {
                res.status(404).json({ message: "NOT FOUND" })
            }
            res.status(200).json(delivery);
            // res.status(200).json({ delivery: delivery.map(item => mappingEntityToDTO(item)) });
        }
        else{
            return res.status(403).json({ message: "NOT PERMISTION" });
        }
    }
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"});

    }
};

export const deleteDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const check = await checkRoles(req, res);
        if(check){
            const { idList } = req.body;
            const deleteDelivery = await createQueryBuilder()
                .softDelete()
                .from(DeliveryOrder)
                .where("id IN(:...ids)", { ids: idList })
                .execute();
            res.status(200).json({ message: "success" });
        }
        else{
            return res.status(403).json({ message: "NOT PERMISTION" });
        }
    }
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"});

    }
};

export const restoreDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const check = await checkRoles(req, res);
        if(check){
            const restoreOrder = await getRepository(DeliveryOrder).restore(req.params.id);
            res.status(200).json({ message: "success" });
        }
        else{
            return res.status(403).json({ message: "NOT PERMISTION" });
        }
    }
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"});

    }
};