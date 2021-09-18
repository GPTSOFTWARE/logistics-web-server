import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SaleOrder } from "./SaleOrder";

export interface IPaymentMethod {
    id: number;
    codePayment: string;
    namePayment: string;
}
@Entity()
export class PaymentMethod extends BaseEntity implements IPaymentMethod {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codePayment: string;

    @Column()
    namePayment: string;


    @OneToMany(() => SaleOrder, (saleOrder: SaleOrder) => saleOrder.paymentMethod)
    saleOrders!: SaleOrder[];
}