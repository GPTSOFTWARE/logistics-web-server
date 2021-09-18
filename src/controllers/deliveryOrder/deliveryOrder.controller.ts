import {Request, Response, NextFunction} from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { DeliveryOrder, IDeliveryOrder } from "../../entity/DeliveryOrder";
import { SaleOrder } from "../../entity/SaleOrder";

export const confirmSaleOrder = async ( // xác nhận đơn hàng lên xe để đi giáo
    req: Request<any , any, any, any>, 
    res: Response, 
    next: NextFunction) => {
        try{
            const data = req.body;
            const time = new Date();
            const createDeliveryOrder = await createQueryBuilder('delivery')
                                            .insert()
                                            .into(DeliveryOrder)
                                            .values({ 
                                                deliveryId: data.deliveryId,
                                                saleOrderId: data.saleOrderId,
                                            })
                                            .execute();
                                    res.status(200).send('Confirm order successful');
        }
        catch (error) {
            console.log(error);
        }
};