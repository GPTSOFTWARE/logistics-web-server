import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { Repository } from "typeorm";
import { getRepository } from "typeorm/globals";
import { Job } from "../../entity/job";
import { SaleOrder } from "../../entity/SaleOrder";

export const searchingOrder = async (req: Request, res: Response, next: NextFunction) =>{

    try{ 
    
        const {customerPhone , name, date} = req.body;
        console.log(customerPhone, name, date);

        const reqName = name.toLowerCase();
        const parseDate = Date.parse(date.toString());
        const date2 = moment(date).format("MMM Do YY"); 

        console.log(date2);
      
        const order = await getRepository(SaleOrder)
                            .createQueryBuilder('order')
                            .leftJoinAndSelect('order.products', 'product')
                            .leftJoinAndSelect('product.unit', 'unit_id')
                            .leftJoinAndSelect('order.paymentMethod', 'payment')
                            .leftJoinAndSelect('order.categories', 'Category')
                            .leftJoinAndSelect('order.unit', 'unit')
                            .where('order.customerPhone = :phone', { phone: customerPhone})
                            .getMany();
        console.log(order);
        if(order){
            let newArray = [];
            for(let item of order){
                const date = item.createdAt;
                const newdate = moment(date).format("MMM Do YY");
                console.log(newdate);
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


export const searchingJob = async (req: Request, res: Response, next: NextFunction) =>{
    
    try{
        const page = +req?.query?.page || 1;
        const page_size = +req?.query?.page_size || 10;
        const name = req.query.name;
        const [data, total] = await getRepository(Job)
            .createQueryBuilder("job")
            .where('job.nameJob ILIKE :name', {name : `%${name}%`})
            .take(page_size)
            .skip((page - 1) * page_size)
            .getManyAndCount();
        return res.json({ total, data });
    }
    catch(err){
        console.log(err);

    }
}