import { 
    BaseEntity,
    Column,
    Entity, 
    PrimaryGeneratedColumn
 } from "typeorm";

@Entity()
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: "varchar",
        length: "255",
    })
    email: string;

    @Column({
        type: "varchar",
        length: "255",
        nullable: false,
    })
    password: string;

    @Column({ type: "varchar", length: "50" })
    fullname: string;

    @Column({
        type: "varchar",
        length: "11",
        nullable: false,
    })
    phone: string;


    
}