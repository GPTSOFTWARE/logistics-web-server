import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, Unique, DeleteDateColumn, BeforeUpdate, BeforeInsert } from "typeorm";
import { SaleOrder } from "./SaleOrder";

export enum Role {
    ADMIN = "admin",
    USER = "user",
    MANAGE = "manage"
}

@Entity()
@Unique(['phone'])
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: "255",
        nullable: true
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

    @Column({ type: "varchar", nullable: true })
    imgUrl: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role;

    @Column({
        type: "timestamp with time zone",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP" 
    })
    public updatedAt: Date;

    @Column({
        type: "timestamp with time zone",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP"
    })
    public createdAt: Date;

    @BeforeUpdate()
    public setUpdatedAt() {
        this.updatedAt = new Date();
    }

    @BeforeInsert()
    public updateDates() {
        // const time = Math.floor(Date.now() / 1000);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    
    @DeleteDateColumn()
    deletedAt?: Date;
}