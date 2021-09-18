import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StringLiteralLike } from "typescript";
import { DeliveryOrder } from "./DeliveryOrder";
import { SaleOrder } from "./SaleOrder";


export interface IDriver{
    
    id: number;
    name:string;
    phone:String;
    age:number;

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

    @OneToMany(() => DeliveryOrder, (saleOrder:DeliveryOrder) =>saleOrder.driver)
    deliveryOrders: DeliveryOrder[];
}