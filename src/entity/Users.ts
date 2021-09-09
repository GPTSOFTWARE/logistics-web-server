import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { SaleOrderHeader } from "./SaleOrderHeader";

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    // one user can have multiple sale_order_header
    @OneToMany(() => SaleOrderHeader, order => order.user)
    orders: SaleOrderHeader[];








}