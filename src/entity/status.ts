import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Delivery extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    status_id:number;

    @Column()
    status_name:string;
    
}