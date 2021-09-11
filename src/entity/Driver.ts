import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Driver extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number ;

    @Column()
    code:number

    @Column()
    name:string;
}