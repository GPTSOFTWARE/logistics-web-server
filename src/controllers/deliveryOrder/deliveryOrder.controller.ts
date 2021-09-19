import {Request, Response, NextFunction} from "express";
import moment from "moment";
import { createQueryBuilder, getRepository } from "typeorm";
import { createAbstractBuilder } from "typescript";
import { DeliveryOrder, IDeliveryOrder } from "../../entity/DeliveryOrder";
import { SaleOrder } from "../../entity/SaleOrder";

export const switchDelivery = async ( 
    req: Request<any , any, any, any>, 
    res: Response, 
    next: NextFunction) => {
        try{
            const data = req.body; 
            
            const findSaleOrder = await getRepository(DeliveryOrder)
                                        .createQueryBuilder('delivery')
                                        .where('delivery.saleOrderId = :deliId',{deliId: data.saleOrderId})
                                        .andWhere('delivery.statusId = :statusId', {statusId: data.statusId})
                                        .getOne();
            // console.log(findSaleOrder);
            var newDate = new Date();
            var date = moment(newDate);
            if(findSaleOrder){
                return res.json({message:'đơn hàng đang ở trong trạng thái này'})
            }
            const createNewDelivery = await createQueryBuilder()
                                            .insert()
                                            .into(DeliveryOrder)
                                            .values({
                                                statusId: data.statusId,
                                                saleOrderId: data.saleOrderId,
                                                typeShip: data.typeShip,
                                                plannedTime: date.add(8, 'h')

                                            })
                                            .execute();
            const statusId = createNewDelivery.identifiers[0].id;
            console.log(statusId);

            // if(statusId == 2){
            //     await createQueryBuilder('delivery')
            //             .update(SaleOrder)
            //             .set({
            //                 plannedTime: createNewDelivery.identifiers[5].plannedTime
            //             })
            //             .where('delivery.statusId = :Id', {Id: 1})
            //             .andWhere('delivery.saleOrderId = :orderId', {orderId: data.saleOrderId})
            //             .execute();
            // }
            // else if(statusId == 3){
            //     await createQueryBuilder('delivery')
            //     .update(SaleOrder)
            //     .set({
            //         plannedTime: new Date()
            //     })
            //     .execute();
            // }
                                            console.log(createNewDelivery);
                                            res.status(200).json({message:'cập nhật tình trạng đơn hàng thành công'});
            
        }
        catch (error) {
            console.log(error);
        }
};
