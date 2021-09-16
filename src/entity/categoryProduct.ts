import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

export interface IUnit {
    id:number;
    name:string;
}

@Entity()
export class Unit extends BaseEntity implements IUnit {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToMany(() => Product, (product:Product) => product.unit)
    products:Product[];
}