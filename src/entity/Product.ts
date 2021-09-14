import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { AbstractBase } from './Base';
import { Category } from "./Category";
import { SaleOrder } from "./SaleOrder";
@Entity()
export class Product extends AbstractBase {
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

    @Column({
        type: "text",
        nullable: true,
    })
    description: string;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'category' })
    category: Category;

    @ManyToOne(() => SaleOrder, SO => SO.products)
    orderId: SaleOrder[];

}