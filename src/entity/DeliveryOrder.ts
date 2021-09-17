import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Delivery } from "./Delivery";
import { SaleOrder } from "./SaleOrder";


@Entity()
export class DeliveryOrder extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    saleOrderId!: number;

    @Column()
    deliveryId!: number;

    @Column({
        type: "timestamp with time zone",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP" // Pass prop datatype require is String Boolean Number
    })
    public createdAt: Date;

    @BeforeInsert()
    public updateDates() {
        this.createdAt = new Date();
    }

    @ManyToOne(() =>SaleOrder, (saleOrder: SaleOrder) => saleOrder.deliveryOrders, { onDelete: 'CASCADE' })
    saleOrder!: SaleOrder;

    @ManyToOne(() =>Delivery, (delivery: Delivery) => delivery.deliveryOrders, { onDelete: 'CASCADE' })
    delivery!: Delivery;




}