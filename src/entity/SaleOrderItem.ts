import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { SaleOrderHeader } from "./SaleOrderHeader";
import { Product } from './Product';
import { SaleOrder } from "./OrderDetails";

@Entity()
export class SaleOrderItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(() => SaleOrder, saleorder=>saleorder.items)
    orderId: SaleOrder;

    @OneToMany(() => Product, product => product.orderId)
    products: Product[];

}