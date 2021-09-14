import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractBase } from "./Base";
import { DeliveryOrderItem } from "./DeliveryOrderItem";
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
    to_address: string;

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


}