import { Request, Response, NextFunction } from "express";
import moment from "moment";
import { createQueryBuilder, getRepository } from "typeorm";
import { DeliveryHistory } from "../../entity/DeliveryHistory";
import { DeliveryOrder, IDeliveryOrder } from "../../entity/DeliveryOrder";
import { Driver } from "../../entity/Driver";
import { Status } from "../../entity/Status";
import { createOrder } from "../SaleOrder/SOH.controller";

export const switchDelivery = async (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction) => {
    try {
        const data = req.body;
        console.log({ data });

        const findSaleOrder = await getRepository(DeliveryOrder)
            .createQueryBuilder('delivery') 
            .where('delivery.id = :id', {id: req.params.id})
            .getOne();
        const findStatus = await getRepository(Status)
            .createQueryBuilder('status')
            .andWhere('status.id = :id', { id: data.statusId })
            .getOne();

        // get history delivery 
        const historyDeli = await getRepository(DeliveryHistory)
                                .createQueryBuilder('history')
                                .where('history.deliveryOrderId = :id', {id : req.params.id})
                                .getMany(); 
        console.log(historyDeli);
        var newDate = new Date();
        var date = moment(newDate);
        if (findSaleOrder) { // nếu tìm thấy đơn hàng
            //check status exitst in history
            for(let item of historyDeli){
                if( item.status == findStatus.name){
                    //if status exists not add to history, changing delivery order side
                    if(findSaleOrder.statusId == 1){ //thay đổi hình thức giao hàng
                        const updateStatusDelivery = await createQueryBuilder()
                                                    .update(DeliveryOrder)
                                                    .set({                           
                                                        typeShip: data.typeShip,
                                                    })
                                                    .where("id = :id", { id: req.params.id })
                                                    .execute();  
                                                    res.status(200).json({ message: "success"});   
            
                    }
                    else{
                        if(findSaleOrder.driver == data.driverId){
                            res.status(409).json({message: "Can not change driver"});
                        }
                        else{
                            res.status(200).json({ message: "success"});
                        }

                    }
                }
                else if (item.status != findStatus.name){
                    const updateStatusDelivery = await createQueryBuilder()
                                            .update(DeliveryOrder)
                                            .set({
                                                statusId: data.statusId,
                                                plannedTime: date.add(8, 'h'),
                                                driver: data.driverId,
                                            })
                                            .where("id = :id", { id: req.params.id })
                                            .execute();

                    await createQueryBuilder()
                                .insert()
                                .into(DeliveryHistory)
                                .values({
                                    deliveryOrderId: req.params.id,
                                    status: findStatus?.name
                                })
                                .execute();
                    res.status(200).json({ message: "success"});
                }
            }


        }
        else{
            res.status(404).json({ code: "404",  message: "NOT FOUND"})
        }
        // //check driverexist ;
        // const checkDriver = await getRepository(Driver).findOne(data.driverId);
        // if (!checkDriver) {
        //     res.status(404).json({ message: 'Driver Not Found' });
        // }
        // else {
        //     //update status delivery
        //     const updateStatusDelivery = await createQueryBuilder()
        //         .update(DeliveryOrder)
        //         .set({
        //             statusId: data.statusId,
        //             plannedTime: date.add(8, 'h'),
        //             typeShip: data.typeShip,
        //             driver: data.driverId,
        //         })
        //         .where("id = :id", { id: req.params.id })
        //         .execute();
        //     //after update new status, add new status of delivery into delivery history.

        //     await createQueryBuilder()
        //         .insert()
        //         .into(DeliveryHistory)
        //         .values({
        //             deliveryOrderId: req.params.id,
        //             status: findStatus?.name
        //         })
        //         .execute();
        //     res.status(200).json({ message: 'Cập nhật tình trạng đơn hàng thành công' });

        // }
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
            .leftJoinAndSelect('DO.deliveryHistory', 'delivery')
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
