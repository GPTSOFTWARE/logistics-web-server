import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { SaleOrder } from "./SaleOrder";

export interface IUnit {
    id: number;
    name: string;
}

@Entity()
export class Unit extends BaseEntity implements IUnit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: "100",
        nullable: false,
    })
    name: string;

    @OneToMany(() => Product, (product: Product) => product.unit)
    products: Product[];

    @OneToMany(() => SaleOrder, (SO: SaleOrder) => SO.unit)
    orders: SaleOrder[];
}