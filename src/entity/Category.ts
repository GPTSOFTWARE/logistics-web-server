import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { SaleOrder } from "./SaleOrder";
export interface ICategory {
    id: number;
    name: string;
}
@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    name: string;

    @OneToMany(() => SaleOrder, (saleOrder: SaleOrder) => saleOrder.categories)
    saleOrder: SaleOrder[];

}