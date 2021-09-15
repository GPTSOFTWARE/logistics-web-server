import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { AbstractBase } from "./Base";
import { Category } from "./Category";
import { Delivery } from "./Delivery";
import { DeliveryOrder } from "./DeliveryOrder";
import { Driver } from "./Driver";
import { Product } from "./Product";
export enum typeShip {
    FAST = 'giao hàng nhanh',
    STANDARD = 'giao hàng tiêu chuẩn'
}

export interface ISaleOrder{
    id: number;
    from_name: string;
    from_address:string;
    from_phone:string;
    to_name: string;
    to_address:string
    to_phone:string;
    typeShip: string;
    isFreeShip: boolean;
    totalPrice: number;
    notes:string;
    type?:number;
}

@Entity()
export class SaleOrder extends AbstractBase {

    @PrimaryGeneratedColumn()
    id: number;

    // sender information
    @Column()
    from_name: string;

    @Column()
    from_phone: string;

    @Column()
    from_address: string;

    // receiver information
    @Column()
    to_name: string;

    @Column()
    to_phone: string;

    @Column()
    to_address: string;

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

    @OneToMany(() => Product, (product:Product) =>product.saleOrder)
    products: Product[];

    @ManyToOne(() => Driver, (driver:Driver) => driver.saleOrders)
    @JoinColumn({name :'driver'})
    driver!: Driver;

    @OneToMany(() =>DeliveryOrder, deliveryOrder => deliveryOrder.saleOrder)
    deliveryOrders!: DeliveryOrder[];
}