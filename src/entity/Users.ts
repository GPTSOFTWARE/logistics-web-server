import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, Unique } from "typeorm";
import { SaleOrder } from "./SaleOrder";

export enum Role {
    ADMIN = "admin",
    USER = "user"
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

    // one user can have multiple sale_order_header
    // @OneToMany(() => SaleOrderHeader, order => order.user)
    // orders: SaleOrderHeader[];
}