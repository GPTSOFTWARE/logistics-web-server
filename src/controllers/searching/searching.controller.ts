import { Request, Response } from "express";
import { getRepository } from "typeorm/globals";
import { SaleOrder } from "../../entity/SaleOrder";

export const searchingOrder = async (req: Request, res: Response) =>{

    try{ 
        const searching = req.query.customerPhone;
        const ordercode = req.query.id;
        console.log(ordercode);
        const order = await getRepository(SaleOrder)
                            .createQueryBuilder('order')
                            .select()
                            .leftJoinAndSelect('order.products', 'product')
                            .leftJoinAndSelect('product.unit', 'unit_id')
                            .leftJoinAndSelect('order.paymentMethod', 'payment')
                            .leftJoinAndSelect('order.categories', 'Category')
                            .leftJoinAndSelect('order.unit', 'unit')
                            .where('order.id = :id', {id: ordercode})
                            .andWhere('order.customerPhone = :phone', {phone:searching})
                            .getMany();
        console.log(order);
  
        return res.status(200).json({message: "success"});
    }
    catch(err){
        console.log(err);
    }

};