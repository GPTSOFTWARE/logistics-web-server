import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { SaleOrderItem } from './SaleOrderItem';
import { AbstractBase } from './Base';

@Entity()
export class Product extends AbstractBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        type:"varchar",
        length:"255",
        nullable: false,
    })
    name: string;

    @Column("decimal")
    price: number;

    @Column({ 
        nullable: true,
    })
    quantity: number;

    @Column({ 
        type:"varchar",
        length:"255",
        nullable: true,
    })
    thumbnails: string;

    @Column({ 
        type:"text",
        nullable: true,
    })
    description: string;


    @OneToMany(() => SaleOrderItem, saleOrderItem => saleOrderItem.productId)
    orderItem: SaleOrderItem[];
}