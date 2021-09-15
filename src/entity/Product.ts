import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { AbstractBase } from './Base';
import { Category } from "./Category";
import { SaleOrder } from "./SaleOrder";

export interface IProduct{
    id: number;
    name: string;
    weight:number;
    price:number;
    quantity: number;
    order_id?:number;
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

    @Column("decimal")
    weight: number;

    @Column("decimal")
    price: number;

    @Column({
        nullable: true,
    })
    quantity: number;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'category' })
    category: Category;

    @ManyToOne(() => SaleOrder, (saleOrder: SaleOrder) => saleOrder.products)
    @JoinColumn({ name: 'order_id'})
    saleOrder!: SaleOrder;

}