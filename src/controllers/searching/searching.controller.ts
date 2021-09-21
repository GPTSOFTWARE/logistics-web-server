import { Request, Response } from "express";
import moment from "moment";
import { getRepository } from "typeorm/globals";
import { SaleOrder } from "../../entity/SaleOrder";

export const searchingOrder = async (req: Request, res: Response) =>{

    try{ 
        const searching = req.query.customerPhone;
        const name = req.query.name;
        const date = req.query.date;
        // const parseDate = Date.parse(date.toString());
        var date1 = new Date();
        // var date1 = date.toISOString('dd-MM-yyyy');
        var date2 = moment(date1).format("MMM Do YY");     
        // console.log(date2);

        const order = await getRepository(SaleOrder)
                            .createQueryBuilder('order')
                            .select()
                            .leftJoinAndSelect('order.products', 'product')
                            .leftJoinAndSelect('product.unit', 'unit_id')
                            .leftJoinAndSelect('order.paymentMethod', 'payment')
                            .leftJoinAndSelect('order.categories', 'Category')
                            .leftJoinAndSelect('order.unit', 'unit')
                            .where('order.customerPhone = :phone', {phone:searching})
                            .andWhere('order.customerName = :name', {name: name})
                            .andWhere('moment(order.createdAt).format("MMM Do YY) = :time',{time: date2 })
                            .getMany();
        console.log(order);
  
        return res.status(200).json({message: "success"});
    }
    catch(err){
        console.log(err);
    }

};