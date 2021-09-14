import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { DeliveryOrderHeader } from "./DeliveryOrderHeader";
import { Product } from './Product';
import { SaleOrder } from "./SaleOrder";

@Entity()
export class DeliveryOrderItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => SaleOrder, SO => SO.orders)
    orderId: SaleOrder;

    @OneToMany(() => DeliveryOrderHeader, DOI => DOI.deliveries)
    deliveryId: DeliveryOrderHeader[];

}