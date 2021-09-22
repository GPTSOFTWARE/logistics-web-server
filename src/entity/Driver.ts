import { BaseEntity, BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StringLiteralLike } from "typescript";
import { DeliveryOrder } from "./DeliveryOrder";
import { SaleOrder } from "./SaleOrder";


export interface IDriver{
    
    id: number;
    name:string;
    phone:String;
    age:number;
    idenityCard: string;
    img:string;

}
@Entity()
export class Driver extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number ;

    @Column()
    name:string;


    @Column({
        type: "varchar",
        length: "11",
        nullable: false,
    })
    phone: string;

    @Column()
    age:number;

    @Column()
    img: string;

    @Column()
    idenityCard:string;

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

   


    @OneToMany(() => DeliveryOrder, (saleOrder:DeliveryOrder) =>saleOrder.driver)
    deliveryOrders: DeliveryOrder[];
}