import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export interface IRequestOrder{

    id: number;
    fullname: string;
    phone: string;
    email: string;
    address: string;
    typeProduct: string;
    weight: number;
    fastShip:boolean;
    note: string;
} 

@Entity()
export class RequestOrder extends BaseEntity implements IRequestOrder {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;
    
    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    typeProduct : string;

    @Column()
    weight: number;

    @Column()
    fastShip: boolean;

    @Column()
    note:string;


}