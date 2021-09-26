
import { Request, Response, NextFunction } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { DeliveryOrder } from "../../entity/DeliveryOrder";
import { SaleOrder } from "../../entity/SaleOrder";
import { mappingIdDown } from "./DO.mapper";


export const createDelivery  = async (req: Request, res:Response, next: NextFunction) => {

    try{
        const {saleOrderId, statusId, driverId, typeShip} = req.body;
        const saleOrder = await getRepository(SaleOrder).findOne(mappingIdDown(saleOrderId));
        if(saleOrder){
            const createDelivery = await createQueryBuilder()
                                        .insert()
                                        .into(DeliveryOrder)
                                        .values({
                                            saleOrderId: mappingIdDown(saleOrderId),
                                            statusId: statusId,
                                            typeShip: typeShip,
                                            driver : driverId,
                                        })
                                        .execute();
                res.status(201).json({code:"201", message:"created"});
        }
        else{
            res.status(404).json({code:"404", message:"NOT FOUND"});
        }

    }
    catch(error){
        console.error(error);
    }
}