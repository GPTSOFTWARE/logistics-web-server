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

    @Column()
    fullname: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    title: string;

    @Column('text')
    text: string;
}