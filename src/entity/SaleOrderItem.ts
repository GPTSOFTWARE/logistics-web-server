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

    // @ManyToOne(() => SaleOrderHeader, (SOH: SaleOrderHeader) => SOH.soi, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // @JoinColumn({name: "SOH_id"})
    // orderId: SaleOrderHeader;

    // @OneToMany(() => Product, product => product.orderItem, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // @JoinColumn({name: "productid"})
    // productId: Product;

}