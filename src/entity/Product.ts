import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { SaleOrderHeader } from "./SaleOrderHeader";

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

    @ManyToOne(() => SaleOrderHeader, SOH => SOH.idProduct)
    SOHs: SaleOrderHeader[];
}