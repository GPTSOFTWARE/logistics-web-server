import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { SaleOrderHeader } from "./SaleOrderHeader";
import { Product } from './Product';

@Entity()
export class SaleOrderItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    @OneToMany(() => SaleOrderHeader, (SOH: SaleOrderHeader) => SOH.SOI_SOH, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    SOHs: Array<SaleOrderHeader>

    @PrimaryGeneratedColumn()
    @OneToMany(() => Product, (SOH: Product) => SOH.SOI_Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    Products: Array<Product>

    @Column()
    totalPrice: number;

    @Column()
    quantity: number;

}