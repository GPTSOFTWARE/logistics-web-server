import { BaseEntity, BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, IsNull, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DeliveryOrder } from "./DeliveryOrder";


export interface IDriver {

    id: number;
    name: string;
    phone: String;
    age: number;
    idenityCard: string;
}
@Entity()
export class Driver extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: "50",
        nullable: false,
    })
    name: string;


    @Column({
        type: "varchar",
        length: "11",
    })
    phone: string;

    @Column()
    age: number;

    @Column({
        type: "varchar",
        length: "20",
        nullable: false,
        unique:true,
    })
    idenityCard: string;

    @Column({
        type: "timestamp with time zone",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP"
    })
    public updatedAt: Date;

    @Column({
        type: "timestamp with time zone",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP"
    })
    public createdAt: Date;

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




    @OneToMany(() => DeliveryOrder, (saleOrder: DeliveryOrder) => saleOrder.driver)
    deliveryOrders: DeliveryOrder[];
}