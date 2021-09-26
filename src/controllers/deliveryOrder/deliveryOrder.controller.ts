import { Request, Response, NextFunction } from "express";
import moment from "moment";
import { createQueryBuilder, getRepository } from "typeorm";
import { DeliveryHistory } from "../../entity/DeliveryHistory";
import { DeliveryOrder, IDeliveryOrder } from "../../entity/DeliveryOrder";
import { Driver } from "../../entity/Driver";

export const switchDelivery = async (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction) => {
    try {
        const data = req.body;
        console.log({ data });

        const findSaleOrder = await getRepository(DeliveryOrder)
            .createQueryBuilder('delivery')
            .where('delivery.saleOrderId = :deliId', { deliId: data.saleOrderId })
            .andWhere('delivery.statusId = :statusId', { statusId: data.statusId })
            .getOne();
        // console.log(findSaleOrder);
        var newDate = new Date();
        var date = moment(newDate);
        if (findSaleOrder) {
            return res.status(409).json({ message: 'Đơn hàng đang ở trong trạng thái này' }); //  delivery exists !
        }
        //check driverexist ;
        const checkDriver = await getRepository(Driver).findOne(data.driverId);
        if (!checkDriver) {
            res.status(404).json({ message: 'Driver Not Found' });
        }
        else {
            //update status delivery
            const updateStatusDelivery = await createQueryBuilder()
                .update(DeliveryOrder)
                .set({
                    statusId: data.statusId,
                    plannedTime: date.add(8, 'h'),
                    typeShip: data.typeShip,
                    driver: data.driverId,
                })
                .where("id = :id", { id: req.params.id })
                .execute();
            //after update new status, add new status of delivery into delivery history.

            await createQueryBuilder()
                .insert()
                .into(DeliveryHistory)
                .values({
                    deliveryOrderId: req.params.id,
                    status: data?.status?.name
                })
                .execute();
            res.status(200).json({ message: 'Cập nhật tình trạng đơn hàng thành công' });

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
