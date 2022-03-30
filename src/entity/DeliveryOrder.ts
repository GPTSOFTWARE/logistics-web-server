import { BaseEntity, BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./Status";
import { Driver } from "./Driver";
import { SaleOrder } from "./SaleOrder";
import { DeliveryHistory } from "./DeliveryHistory";

export enum typeShip {
    FAST = 'giao hàng nhanh',
    STANDARD = 'giao hàng tiêu chuẩn'
}

export interface IDeliveryOrder {
    id: number;
    saleOrderId: number;
    statusId: number;
    typeShip: string;
    plannedTime: Date;
}

@Entity()
export class DeliveryOrder extends BaseEntity implements IDeliveryOrder {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    saleOrderId!: number;

    @Column()
    statusId!: number;

    @Column({
        type: "timestamp with time zone",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP" // Pass prop datatype require is String Boolean Number
    })
    public updatedAt: Date;

    @Column({
        type: "timestamp with time zone",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP" // Pass prop datatype require is String Boolean Number
    })
    public createdAt: Date;

    @Column({ nullable: true })
    public updatedBy: number;

    @Column({ nullable: true })
    public createdBy: number;

    @BeforeUpdate()
    public setUpdatedAt() {
        this.updatedAt = new Date();
    }

    @BeforeInsert()
    public updateDates() {
        // const time = Math.floor(Date.now() / 1000);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @DeleteDateColumn()
    deletedAt?: Date;

    @Column({
        type: "enum",
        enum: typeShip,
        default: typeShip.STANDARD
    })
    typeShip: string;

    @Column(
        {
            type: "timestamp with time zone",
            nullable: true
        }
    )
    plannedTime: Date;

    @ManyToOne(() => Driver, (driver: Driver) => driver.deliveryOrders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'driverid' })
    driver!: Driver;

    @ManyToOne(() => SaleOrder, (saleOrder: SaleOrder) => saleOrder.deliveryOrders, { onDelete: 'CASCADE' })
    saleOrder!: SaleOrder;

    @ManyToOne(() => Status, (status: Status) => status.deliveryOrders, { onDelete: 'CASCADE' })
    status!: Status;

    @OneToMany(() => DeliveryHistory, (delivery : DeliveryHistory) => delivery.deliveryOrder, { onDelete: 'CASCADE'})
    deliveryHistory!: DeliveryHistory[];


}