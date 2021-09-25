import { BaseEntity, BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractBase } from "./Base";
import { DeliveryOrder } from "./DeliveryOrder";


@Entity()
export class DeliveryHistory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number ;

    @Column()
    deliveryOrderId!:number;

    @Column()
    status:string;

    @ManyToOne(() =>DeliveryOrder , (history:DeliveryOrder) => history.deliveryHistory, { onDelete: 'CASCADE'})
    deliveryOrder!:DeliveryOrder;

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
    
}