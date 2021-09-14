import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductCollectionDTO, productDTO } from "../DTO/productDTO";
import { AbstractBase } from "./Base";
import { DeliveryOrderItem } from "./DeliveryOrderItem";
import { Product } from "./Product";
export enum typeShip {
    FAST = 'giao hàng nhanh',
    STANDARD = 'giao hàng tiêu chuẩn'
}

@Entity()
export class SaleOrder extends AbstractBase {

    @PrimaryGeneratedColumn()
    id: number;

    // sender information
    @Column()
    fromName: string;

    @Column()
    fromPhone: string;

    @Column()
    fromAddress: string;

    // receiver information
    @Column()
    toName: string;

    @Column()
    toPhone: string;

    @Column()
    toAddress: string;

    @Column({
        type: "enum",
        enum: typeShip,
        default: typeShip.STANDARD
    })
    typeShip: string;

    @Column()
    isFreeShip: boolean;

    @Column({
        nullable: true
    })
    order_value: number;

    @ManyToOne(() => DeliveryOrderItem, DOI => DOI.orderId)
    orders: DeliveryOrderItem[];

    @Column()
    listProduct:string ; 
}