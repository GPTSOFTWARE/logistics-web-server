import { Request, Response, NextFunction } from "express";
import moment from "moment";
import { createQueryBuilder, getRepository } from "typeorm";
import { DeliveryHistory } from "../../entity/DeliveryHistory";
import { DeliveryOrder, IDeliveryOrder } from "../../entity/DeliveryOrder";
import { Status } from "../../entity/Status";
import { mappingEntityToDTO } from './DO.mapper';


export const switchDelivery = async (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction) => {
    try {
        const data = req.body;
        const findSaleOrder = await getRepository(DeliveryOrder)
            .createQueryBuilder('delivery')
            // .where('delivery.saleOrderId = :deliId', { deliId: mappingIdDown(data.saleOrderId) })
            // .andWhere('delivery.statusId = :statusId', { statusId: data.statusId })
            .where('delivery.id = :id ', { id: req.params.id })
            .getOne();
        const findStatus = await getRepository(Status)
            .createQueryBuilder('status')
            .andWhere('status.id = :id', { id: data.statusId })
            .getOne();

        var newDate = new Date();
        var date = moment(newDate);
        if (findSaleOrder) { // nếu tìm thấy đơn hàng
            //check status exitst in history
            if (findSaleOrder.statusId === -1) {
                res.status(409).json({ code: "409", message: "Delivery canceled !" });
            }
            else if(findSaleOrder.statusId === 3){
                res.status(400).json({ code: "400", message: "Đơn hàng đã được giao"})
            }
            else {         
            const findDelivery = await getRepository(DeliveryHistory)
                                    .createQueryBuilder('deli')
                                    .where('deli.deliveryOrderId = :id', { id: req.params.id })
                                    .andWhere('deli.status = :status ', { status: findStatus.name })
                                    .getOne();
            const findHistory = await getRepository(DeliveryHistory)
                    .createQueryBuilder('deli')
                    .where('deli.deliveryOrderId = :id', { id: req.params.id })
                    .getMany();
                if (findDelivery) {
                    if (findHistory.length == 1) {
                        await createQueryBuilder()
                            .update(DeliveryOrder)
                            .set({
                                typeShip: data.typeShip,
                            })
                            .where("id = :id", { id: req.params.id })
                            .execute();
                        res.status(200).json({ code: "200", message: "Cập nhật hình thức giao hàng thành công" });
                    }
                    else {
                        return res.status(400).json({ code: "400", message: "NOT ALLOWED!" });
                    }

                }
                else{
                    if(data.statusId === 2){
                        const updateStatusDelivery = await createQueryBuilder()
                            .update(DeliveryOrder)
                            .set({
                                statusId: data.statusId,
                                plannedTime: date.add(8, 'h'),
                                driver: data.driverId,
                            })
                            .where("id = :id", { id: req.params.id })
                            .execute();
                    }
                    else{
                        const updateStatusDelivery = await createQueryBuilder()
                        .update(DeliveryOrder)
                        .set({
                            statusId: data.statusId,
                        })
                        .where("id = :id", { id: req.params.id })
                        .execute();
                    }
                
                        await createQueryBuilder()
                            .insert()
                            .into(DeliveryHistory)
                            .values({
                                deliveryOrderId: req.params.id,
                                status: findStatus?.name
                            })
                            .execute();
                    res.status(200).json({ code: "200", message: "cập nhật tình trạng đơn hàng thành công" });

        }
    }

        }

        else {
            res.status(404).json({ code: "404", message: "NOT FOUND" })
        }
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

        return res.json({ total, data: data.map(item => mappingEntityToDTO(item)) });
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
