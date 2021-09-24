import { BaseEntity, BeforeInsert, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./Status";
import { Driver } from "./Driver";
import { SaleOrder } from "./SaleOrder";

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
    public createdAt: Date;

    @Column({
        type: "enum",
        enum: typeShip,
        default: typeShip.STANDARD
    })
    typeShip: string;

    @Column(
        {
            type: "timestamp with time zone",
            nullable: true,
            default: () => "CURRENT_TIMESTAMP" // Pass prop datatype require is String Boolean Number
        }
    )
    plannedTime: Date;

    @ManyToOne(() => Driver, (driver: Driver) => driver.deliveryOrders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'driver_id' })
    driver!: Driver;

    @ManyToOne(() => SaleOrder, (saleOrder: SaleOrder) => saleOrder.deliveryOrders, { onDelete: 'CASCADE' })
    saleOrder!: SaleOrder;

    @ManyToOne(() => Status, (status: Status) => status.deliveryOrders, { onDelete: 'CASCADE' })
    status!: Status;

    @BeforeInsert()
    public updateDates() {
        this.createdAt = new Date();
    }

    @DeleteDateColumn()
    deletedAt?: Date;

}