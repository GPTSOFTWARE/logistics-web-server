import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractBase } from "./Base";
import { DeliveryOrder } from "./DeliveryOrder";
import { SaleOrder } from "./SaleOrder";

export interface IStatus {
    id:number;
    code:string;
    name:string;
}

@Entity()
export class Status extends BaseEntity implements IStatus{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    code: string;

    @Column()
    name: string;

    @OneToMany(() =>DeliveryOrder, deliveryOrder => deliveryOrder.status)
    deliveryOrders!: DeliveryOrder[];
}