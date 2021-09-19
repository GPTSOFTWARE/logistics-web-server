import {Request, Response, NextFunction} from "express";
import { createQueryBuilder, getRepository } from "typeorm";
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
            console.log(findSaleOrder);
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

                                            })
                                            .execute();
                                            console.log(createNewDelivery);
                                            res.status(200).json({message:'cập nhật tình trạng đơn hàng thành công'});
            
        }
        catch (error) {
            console.log(error);
        }
};
