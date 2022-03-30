import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { AbstractBase } from "./Base";
import { Category } from "./Category";
import { Unit } from "./Unit";
import { DeliveryOrder } from "./DeliveryOrder";
import { Driver } from "./Driver";
import { PaymentMethod } from "./payment";
import { Product } from "./Product";

export enum typeCustomer {
    KM = 'Khách Mối',
    KVL = 'Khách Vãng Lai'
}

export interface ISaleOrder {
    id: number;
    customerName: string;
    customerType: string;
    customerAddress: string;
    customerPhone: string;
    receiverName: string;
    receiverAddress: string
    receiverPhone: string;
    isFreeShip: boolean;
    totalPrice: number;
    notes: string;
    orderType?: number;
    quantity?: number;
    payment_id?: number;
    unit_id?: number;
    orderName: string;
}

@Entity()
export class SaleOrder extends AbstractBase implements ISaleOrder {

    @PrimaryGeneratedColumn()
    id: number;

    // sender information
    @Column({
        type: "varchar",
        length: "100"
    })
    customerName: string;

    @Column()
    customerAddress: string;

    @Column({
        type: "varchar",
        length: "11"
    })
    customerPhone: string;

    // receiver information
    @Column({
        "type": "varchar",
        length: "100"
    })
    receiverName: string;

    @Column()
    receiverAddress: string;

    @Column({
        "type": "varchar",
        length: "11"
    })
    receiverPhone: string;

    @Column({
        type: "varchar",
        length: "100",
        nullable: true
    })
    orderName: string;

    @Column({
        type: "enum",
        enum: typeCustomer,
        default: typeCustomer.KVL
    })
    customerType: string;

    @Column()
    isFreeShip: boolean;

    @Column()
    quantity: number;

    @Column("float")
    totalPrice: number;

    @Column({
        type: "text",
        nullable: true
    })
    notes: string;

    @ManyToOne(() => Category, (category: Category) => category.saleOrder)
    @JoinColumn({ name: 'orderType' })
    categories: Category;

    @ManyToOne(() => PaymentMethod, (paymentMethod: PaymentMethod) => paymentMethod.saleOrders)
    @JoinColumn({ name: 'payment_id' })
    paymentMethod: PaymentMethod;

    @ManyToOne(() => Unit, (unit: Unit) => unit.orders)
    @JoinColumn({ name: 'unit_id' })
    unit: Unit;

    @OneToMany(() => DeliveryOrder, deliveryOrder => deliveryOrder.saleOrder)
    deliveryOrders!: DeliveryOrder[];

    @OneToMany(() => Product, (product: Product) => product.saleOrder)
    products: Product[];

}