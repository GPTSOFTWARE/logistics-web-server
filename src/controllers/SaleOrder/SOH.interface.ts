import { ISaleOrder } from "../../entity/SaleOrder";


export interface ICreateOrderDTO extends ISaleOrder{
    
    products: OrderProduct[];
    typeShip: string;
    
}

export interface IUpdateOrderDTO extends ISaleOrder{
    products: UpdateProduct[];
}

export interface OrderProduct {

    name: string;
    quantity: number;
    order_id?:number;
    unit_id?:string;
}


export interface UpdateProduct{
    id: number;
    name: string;
    quantity: number;
    order_id?:number;
    unit_id?:number
}