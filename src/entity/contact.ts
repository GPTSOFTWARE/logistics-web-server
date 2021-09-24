import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IContact {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    title:string;
    text: string;
}

@Entity()
export class Contact extends BaseEntity implements IContact {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: "50",
        nullable: false,
    })
    fullname: string;

    @Column({
        type: "varchar",
        length: "30",
        nullable: true,
    })
    email: string;

    @Column({
        type: "varchar",
        length: "11",
        nullable: true,
    })
    phone: string;

    @Column()
    title: string;

    @Column('text')
    text: string;
}