import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { AbstractBase } from './Base';
import { Unit } from "./Unit";
import { SaleOrder } from "./SaleOrder";

export interface IProduct{
    id: number;
    name: string;
    quantity: number;
    order_id?:number;
    unit_id?:number;
}
@Entity()
export class Product extends BaseEntity implements IProduct{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: "255",
        nullable: false,
    })
    name: string;

    @Column({
        nullable: true,
    })
    quantity: number;


    @ManyToOne(() => SaleOrder, (saleOrder: SaleOrder) => saleOrder.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id'})
    saleOrder!: SaleOrder;

    @ManyToOne(() => Unit, (unit: Unit)=> unit.products)
    @JoinColumn({ name: 'unit_id'})
    unit!: Unit;

}