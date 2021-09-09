import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { SaleOrderItem } from './SaleOrderItem';
import { UserAccount } from "./Users";

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

    @ManyToOne(() => SaleOrderItem, (SOI: SaleOrderItem) => SOI.SOHs)
    @JoinColumn({ name: 'SOI_id' })
    SOI_SOH: SaleOrderItem

    @ManyToOne(() => UserAccount, user => user.orders)
    @JoinColumn({ name: 'User_id'})
    user: UserAccount;

}