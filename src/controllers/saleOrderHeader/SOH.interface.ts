import { ISaleOrder } from "../../entity/SaleOrder";


export interface ICreateOrderDTO extends ISaleOrder{
    
    products: OrderProduct[];
    typeShip: string;
    
}

export interface OrderProduct {

    name: string;
    quantity: number;
    order_id?:number;
    unit_id?:number
}

// export interface typeShip {
//     typeship: string;
// }