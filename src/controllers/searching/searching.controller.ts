import { Request, Response } from "express";
import moment from "moment";
import { getRepository } from "typeorm/globals";
import { SaleOrder } from "../../entity/SaleOrder";

export const searchingOrder = async (req: Request, res: Response) =>{

    try{ 
        const phone = req.query.customerPhone;
        const name = req.query.name;
        const date = req.query.date;

        const reqName = name.toString().toLowerCase();
        const parseDate = Date.parse(date.toString());
        const date2 = moment(parseDate).format("MMM Do YY");     

        const order = await getRepository(SaleOrder)
                            .createQueryBuilder('order')
                            .leftJoinAndSelect('order.products', 'product')
                            .leftJoinAndSelect('product.unit', 'unit_id')
                            .leftJoinAndSelect('order.paymentMethod', 'payment')
                            .leftJoinAndSelect('order.categories', 'Category')
                            .leftJoinAndSelect('order.unit', 'unit')
                            .where('order.customerPhone = :phone', { phone: phone})
                            .getMany();
        if(order){
            let newArray = [];
            for(let item of order){
                const date = item.createdAt;
                const newdate = moment(date).format("MMM Do YY");
                const newName = item.customerName.toLowerCase();
                
                if(newName == reqName &&  newdate == date2){
                    newArray.push(item);
                }
            }
            if(newArray.length > 0) {
                console.log(newArray);
                res.status(200).json(newArray);
            }
            else{
                res.status(404).json({message: "Not Found"});
            }
        }
        else{
            return res.status(404).json({message: "Not Found"});
        }
    }
    catch(err){
        console.log(err);
    }

};