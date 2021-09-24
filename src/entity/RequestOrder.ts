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

    @Column({ 
        type: "varchar",
        length: "100",
        nullable: false,
    })
    fullname: string;
    
    @Column({ 
        type: "varchar",
        length: "11",
        nullable: false
    })
    phone: string;

    @Column({ 
        type: "varchar",
        length: "100",
        nullable: true,
    })
    email: string;

    @Column('text')
    address: string;

    @Column()
    typeProduct : string;

    @Column('decimal')
    weight: number;

    @Column()
    fastShip: boolean;

    @Column('text')
    note:string;


}