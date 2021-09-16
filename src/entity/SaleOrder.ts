import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { AbstractBase } from "./Base";
import { Category } from "./Category";
import { Delivery } from "./Delivery";
import { DeliveryOrder } from "./DeliveryOrder";
import { Driver } from "./Driver";
import { PaymentMethod } from "./payment";
import { Product } from "./Product";
export enum typeShip {
    FAST = 'giao hàng nhanh',
    STANDARD = 'giao hàng tiêu chuẩn'
}

export interface ISaleOrder{
    id: number;
    customerName: string;
    customerAddress:string;
    customerPhone:string;
    receiverName: string;
    receiverAddress:string
    receiverPhone:string;
    typeShip: string;
    isFreeShip: boolean;
    totalPrice: number;
    notes:string;
    type?:number;
    payment?:number
}

@Entity()
export class SaleOrder extends AbstractBase implements ISaleOrder{

    @PrimaryGeneratedColumn()
    id: number;

    // sender information
    @Column()
    customerName: string;

    @Column()
    customerAddress: string;

    @Column()
    customerPhone: string;

    // receiver information
    @Column()
    receiverName: string;

    @Column()
    receiverAddress: string;

    @Column()
    receiverPhone: string;

    @Column({
        type: "enum",
        enum: typeShip,
        default: typeShip.STANDARD
    })
    typeShip: string;

    @Column()
    isFreeShip: boolean;

    @Column()
    totalPrice:number;

    @Column()
    notes:string;

    @ManyToOne(() => Category, (category:Category) => category.saleOrder)
    @JoinColumn({name:'type'})
    categories: Category;

    @ManyToOne(() => PaymentMethod, (paymentMethod:PaymentMethod) => paymentMethod.saleOrders)
    @JoinColumn({name:'payment'})
    paymentMethod: PaymentMethod;

    @OneToMany(() => Product, (product:Product) =>product.saleOrder)
    products: Product[];

    @ManyToOne(() => Driver, (driver:Driver) => driver.saleOrders)
    @JoinColumn({name :'driver'})
    driver!: Driver;

    @OneToMany(() =>DeliveryOrder, deliveryOrder => deliveryOrder.saleOrder)
    deliveryOrders!: DeliveryOrder[];
}