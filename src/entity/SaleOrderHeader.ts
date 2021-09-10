import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { SaleOrderItem } from './SaleOrderItem';
import { Account } from "./Users";

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

    @OneToMany(() => SaleOrderItem, SaleOrderItem => SaleOrderItem.orderId)
    SOI: SaleOrderItem[] ;

    @ManyToOne(() => Account, user => user.orders)
    @JoinColumn({ name: 'User_id' })
    user: Account;

}