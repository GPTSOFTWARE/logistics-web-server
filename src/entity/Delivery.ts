import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractBase } from "./Base";
import { DeliveryOrder } from "./DeliveryOrder";
import { SaleOrder } from "./SaleOrder";


@Entity()
export class Delivery extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    code: string;

    @Column()
    name: string;

    @ManyToOne(() => DeliveryOrder, deliveryOrder => deliveryOrder.delivery)
    deliveryOrders!: DeliveryOrder[];

}