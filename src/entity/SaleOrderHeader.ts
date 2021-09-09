import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";

@Entity()
export class SaleOrderHeader extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryGeneratedColumn()
    idProduct: number;

    @PrimaryGeneratedColumn()
    idSOI: number;

    @Column()
    price: number;

    @Column()
    quantity: number;
}