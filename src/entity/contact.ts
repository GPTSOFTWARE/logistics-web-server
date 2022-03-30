import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AbstractBase } from './Base';

export interface IContact {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    title: string;
    text: string;
}

@Entity()
export class Contact extends AbstractBase implements IContact {

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