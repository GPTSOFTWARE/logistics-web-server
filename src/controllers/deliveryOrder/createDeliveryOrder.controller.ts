
import { Request, Response, NextFunction } from "express";
import moment from "moment";
import { createQueryBuilder, getRepository } from "typeorm";
import { DeliveryHistory } from "../../entity/DeliveryHistory";
import { DeliveryOrder } from "../../entity/DeliveryOrder";
import { SaleOrder } from "../../entity/SaleOrder";
import { Status } from "../../entity/Status";
import { mappingIdDown } from "./DO.mapper";


export const createDelivery  = async (req: Request, res:Response, next: NextFunction) => {

    try{
        const {saleOrderId, statusId, driverId, typeShip} = req.body;
        const saleOrder = await getRepository(SaleOrder).findOne(mappingIdDown(saleOrderId));
        // const findStatus = await getRepository(Status)
        // .createQueryBuilder('status')
        // .andWhere('status.id = :id', { id: statusId })
        // .getOne();
        
        var newDate = new Date();
        var date = moment(newDate);
        const findStatus = await findStatusName(statusId);
        if(saleOrder){
            const createDelivery = await createQueryBuilder()
                                        .insert()
                                        .into(DeliveryOrder)
                                        .values({
                                            saleOrderId: mappingIdDown(saleOrderId),
                                            statusId: statusId,
                                            typeShip: typeShip,
                                            plannedTime: date.add(8, 'h'),
                                            driver : driverId,
                                        })
                                        .execute();
            const deliveryId: number = createDelivery.identifiers[0].id;
            let arrayStatus = [1];

            if(statusId === 2){
                arrayStatus.push(2);
                for(let item of arrayStatus){
                    const findStatus = await findStatusName(item);
                    await createQueryBuilder()
                    .insert()
                    .into(DeliveryHistory)
                    .values({
                        deliveryOrderId: deliveryId ,
                        status: findStatus?.name
                    })
                    .execute();
                }
            }else if (statusId === 3){
                arrayStatus.push(2,3);
                for(let item of arrayStatus){
                    const findStatus = await findStatusName(item);
                    await createQueryBuilder()
                    .insert()
                    .into(DeliveryHistory)
                    .values({
                        deliveryOrderId: deliveryId ,
                        status: findStatus?.name
                    })
                    .execute();
                }
            }
            else if(statusId === 1){
                const findStatus = await findStatusName(1);
                 await createQueryBuilder()
                 .insert()
                 .into(DeliveryHistory)
                 .values({
                     deliveryOrderId: deliveryId ,
                     status: findStatus?.name
                 })
                 .execute();
            }
                                    
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
const findStatusName = (id:any) =>{
    const findStatus =  getRepository(Status)
    .createQueryBuilder('status')
    .andWhere('status.id = :id', { id: id })
    .getOne();
    return findStatus;
}