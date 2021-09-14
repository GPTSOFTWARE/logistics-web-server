import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    toAddress: string;

    @Column({
        type: "enum",
        enum: typeShip,
        default: typeShip.STANDARD
    })
    typeShip: string;

    @Column()
    unit: string;

    @Column()
    isFreeShip: boolean;

    @Column({
        nullable: true
    })
    orderValue: number;

    @ManyToOne(() => DeliveryOrderItem, DOI => DOI.orderId)
    orders: DeliveryOrderItem[];

    @OneToMany(() => Product, DOI => DOI.orderId)
    products: Product[];

}