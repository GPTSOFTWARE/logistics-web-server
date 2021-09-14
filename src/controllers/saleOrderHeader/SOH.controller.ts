import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { SaleOrder } from "../../entity/SaleOrder";
import { Account } from "../../entity/Users";
import db from "../../utils/db";
import { comparePassword } from "../../utils/helpers";

const getSaleOrder = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await (await db)
        .getRepository(SaleOrder)
        .createQueryBuilder("saleOrder")
        .take(page_size)
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};


// const createOrder =  async(req: Request, res: Response, next: NextFunction): Promise<Response> => {

//     const data = req.body.order;
//     //create order object
//     const order = await getRepository(SaleOrder).create(data);
//     const createOder = await getRepository(SaleOrder).save(order);

//     //create orderDetails
//     if(!createOder){
//         return res.status(404).send('Not found');
//     }

//     try{
//         const orderItem = new SaleOrderItem();
//         orderItem.orderId = req.body.order.id;
//         const createOrderDetail = await getRepository(SaleOrderItem).create(orderItem);
//         if(createOrderDetail){
//             const dataProduct = req.body.product;
//             dataProduct.orderId = orderItem.id;
//             const createProduct = await getRepository(Product).create(dataProduct);
//                                 await getRepository(Product).save(createProduct);
//         }

//     }
//     catch(err){
//         console.log(err);
//     }


// const dataProduct = req.body.product;
// const orderItem =[];
// try{
//     const product = await getRepository(Product).create(dataProduct);
//     orderItem.push(product);
//     await getRepository(Product).save(product);

//     if(orderItem.length > 0){
//         const newOrder = new SaleOrder();
//         newOrder.id = data.id;
//         newOrder.from_name = data.from_name;
//         newOrder.from_address = data.from_address;
//         newOrder.from_phone = data.from_phone;
//         // const createOrder = await getRepository(SaleOrder).create(data);
//         // const newOrder = await getRepository(SaleOrder).save(createOrder);
//         if(newOrder){
//             const newList = await getRepository(SaleOrderItem)
//                                 .createQueryBuilder()
//                                 .insert()
//                                 .values({
//                                     orderId: newOrder.id.toString,
//                                     products:orderItem
//                                 }).execute();
//         }
//         await getRepository(SaleOrder).save(newOrder);            
//     }

// }
// catch(error){
//     console.log(dataProduct);
//     return res.send(error);
// }

// }
const getOrderById = async (req: Request, res: Response): Promise<Response> => {

    const id = req.params.id;
    const order = await getRepository(SaleOrder).findOne(id);

    if (order) {
        return res.status(200).json(order);
    }
    else {
        return res.status(404).send('Order Not Found');
    }
}

const getOrderByUserId = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    const userId = await getRepository(Account).findOne(req.params.id);

    const listOrder = await getRepository(SaleOrder)
        .createQueryBuilder("order")
        .where("order.user_id = :id", { id: userId })
        .getManyAndCount();

    if (!userId) {
        return res.status(404).send("User Not Found");
    }

    if (listOrder.length > 0) {
        return res.json(listOrder);
    }
    return res.status(200).send("User have no order");

}

// const updateOrder = async (req: Request, res: Response): Promise<Response> => {


// }

export { getSaleOrder, getOrderByUserId, getOrderById }

