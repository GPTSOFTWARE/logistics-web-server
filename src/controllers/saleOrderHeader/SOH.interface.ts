import { ISaleOrder } from "../../entity/SaleOrder";


export interface ICreateOrderDTO extends ISaleOrder{
    
    products: OrderProduct[];
}

export interface OrderProduct {

    name: string;
    weight:string;
    price:number;
    quantity: number;
    order_id?:number;
}