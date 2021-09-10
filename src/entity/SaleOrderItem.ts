import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { SaleOrderHeader } from "./SaleOrderHeader";
import { Product } from './Product';

@Entity()
export class SaleOrderItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    totalPrice: number;

    @Column()
    quantity: number;

    @ManyToOne(() => SaleOrderHeader, (SOH: SaleOrderHeader) => SOH.SOI, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({name: "SOH_id"})
    orderId: SaleOrderHeader;

    @ManyToOne(() => Product, product => product.orderItem, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({name: "productId"})
    productId: Product;

}