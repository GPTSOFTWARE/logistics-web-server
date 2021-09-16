import { ISaleOrder } from "../../entity/SaleOrder";


export interface ICreateOrderDTO extends ISaleOrder{
    
    products: OrderProduct[];
}

export interface OrderProduct {

    name: string;
    quantity: number;
    order_id?:number;
    unit_id?:number
}