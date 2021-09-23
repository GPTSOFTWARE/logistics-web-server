import { Request, Response, NextFunction } from "express";
import moment from "moment";
import { createQueryBuilder, getRepository } from "typeorm";
import { DeliveryOrder, IDeliveryOrder } from "../../entity/DeliveryOrder";

export const switchDelivery = async (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction) => {
    try {
        const data = req.body;

        const findSaleOrder = await getRepository(DeliveryOrder)
            .createQueryBuilder('delivery')
            .where('delivery.saleOrderId = :deliId', { deliId: data.saleOrderId })
            .andWhere('delivery.statusId = :statusId', { statusId: data.statusId })
            .getOne();
        // console.log(findSaleOrder);
        var newDate = new Date();
        var date = moment(newDate);
        if (findSaleOrder) {
            return res.json({ message: 'Đơn hàng đang ở trong trạng thái này' })
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
        res.status(200).json({ message: 'Cập nhật tình trạng đơn hàng thành công' });

    }
    catch (error) {
        console.log(error);
    }
};
export const getDeliveryOrder = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const [data, total] = await getRepository(DeliveryOrder)
            .createQueryBuilder('DO')
            .leftJoinAndSelect('DO.driver', 'driver')
            .leftJoinAndSelect('DO.saleOrder', 'Orders')
            .leftJoinAndSelect('DO.status', 'status')
            .getManyAndCount();

        return res.json({ total, data });
    }
    catch (err) {
        console.error(err);
    }
}

export const getDeliveryOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const delivery = await getRepository(DeliveryOrder).findOne(id);
        res.json(delivery);
    }
    catch (err) {
        console.error(err);
    }
}

export const addDriverToOrder = async (req: Request, res: Response, next: NextFunction) =>{

    try{
        const data = req.body;
        const updateDeli = await createQueryBuilder()
                                .update(DeliveryOrder)
                                .set({ 
                                    driver: data.driverId,
                                })
                                .where('saleOrderId  = :saleOrderId',{saleOrderId: data.saleOrderId})
                                .andWhere('statusId = :statusId',{statusId: data.statusId})
                                .execute();
        res.status(200).json({message: "success"});
    }
    catch(err){
        console.error(err);
    }
}