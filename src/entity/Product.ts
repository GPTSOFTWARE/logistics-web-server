import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { SaleOrderItem } from './SaleOrderItem';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    thumbnails: string;

    @Column()
    description: string;

    @ManyToOne(() => SaleOrderItem, (SOI: SaleOrderItem) => SOI.Products)
    SOI_Product: SaleOrderItem
}