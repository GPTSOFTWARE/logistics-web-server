import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { AbstractBase } from "./Base";
import { DeliveryOrderItem } from "./DeliveryOrderItem";
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

    // @Column({
    //     nullable: true
    // })
    // order_value: number;

    // @ManyToOne(() => DeliveryOrderItem, DOI => DOI.orderId)
    // orders: DeliveryOrderItem[];

    @OneToMany(() => Product, (product:Product) =>product.saleOrder)
    products: Product[];

}