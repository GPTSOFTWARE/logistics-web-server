import { Request, Response , NextFunction} from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { DeliveryOrder } from "../../entity/DeliveryOrder";
import { Driver } from "../../entity/Driver";
import { Product } from "../../entity/Product";
import { SaleOrder } from "../../entity/SaleOrder";


const addProductToDriver = async (req: Request, res: Response, next: NextFunction) => {
    
    try{
            const data = req.body;
            const getSaleOrder = await getRepository(SaleOrder).findOne(data.order_id);
            if(getSaleOrder){
                const getDriver = await getRepository(Driver).findOne(data.driver_id);
                if(getDriver){
                    const addOrder = await createQueryBuilder()
                                            .update(SaleOrder)
                                            .set({driver: data.driver_id})
                                            .where("id = :id", {id: data.order_id})
                                            .execute();
                    await createQueryBuilder('delivery')
                            .insert()
                            .into(DeliveryOrder)
                            .values({
                                saleOrderId: data.order_id,
                                deliveryId:2
                            })
                            .execute();

                }
            }
            res.status(200).json({message : "success"});
        
    }
    catch (err) {
        console.log(err);
    }
}

const changeDelivery = async (req: Request, res: Response, next:NextFunction) => {
    
    try{
            const data = req.body;
            const getSaleOrder = await getRepository(SaleOrder).findOne(req.params.id);
            if(getSaleOrder) {

                const changeDelivery = await createQueryBuilder('delivery')
                                            .insert()
                                            .into(DeliveryOrder)
                                            .values({
                                                saleOrderId: getSaleOrder.id,
                                                deliveryId: data.deliveryId
                                            })
                                            .execute();
                // const getDeleveryOrder = await getRepository(DeliveryOrder)
                //                                 .createQueryBuilder('delevery')
                //                                 .where("delevery.saleOrderId =:id", {id : getSaleOrder.id})
                //                                 .getMany();
                // if(getDeleveryOrder.length > 0) {
                // }
            }
            res.status(200).json({message: "success"});
        
    }
    catch (err) {
        console.log(err);
    }

}


export {addProductToDriver, changeDelivery}