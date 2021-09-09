import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { SaleOrderHeader } from "./SaleOrderHeader";

@Entity()
export class SaleOrderI extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    totalPrice: number;

    @Column()
    totalQuantity: number;

    @ManyToOne(() => SaleOrderHeader, SOH => SOH.idSOI)
    SOHs: SaleOrderHeader
}