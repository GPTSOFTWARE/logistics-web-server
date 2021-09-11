import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { SaleOrderItem } from './SaleOrderItem';
import { Account } from "./Users";

export enum typeShip {
    FAST = 'giao hàng nhanh',
    STANDARD = 'giao hàng tiêu chuẩn'
}

@Entity()
export class SaleOrderHeader extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    totalPrice: number;

    @Column()
    totalQuantity: number;

    @Column({ 
        type:"enum",
        enum: typeShip,
        default:typeShip.STANDARD
    })
    type: typeShip;

    @Column({
    })
    pickDate: Date;

    @OneToMany(() => SaleOrderItem, SaleOrderItem => SaleOrderItem.orderId)
    soi: SaleOrderItem[] ;

    @ManyToOne(() => Account, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: Account;

}