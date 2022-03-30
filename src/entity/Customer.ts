import { 
    BaseEntity,
    Column,
    Entity, 
    PrimaryGeneratedColumn
 } from "typeorm";

export enum typeCustomer{
    KM = 'Khách Mối',
    KVL = 'Khách Vãng Lai'
}



@Entity()
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: "varchar", length: "50" })
    name: string;

    @Column({
        type: "varchar",
        length: "11",
        nullable: false,
    })
    phone: string;

}