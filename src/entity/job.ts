import { BaseEntity, BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

export interface IJob {
    id: number;
    nameJob: string;
    salaryBefore: number;
    salaryAfter: number;
    degree: string;
    address: string;
    position: string;
    require: string;
    thumbnails: string;
    quantity: number;
}


@Entity()
export class Job extends BaseEntity implements IJob {

    @PrimaryGeneratedColumn()
    id: number;

    @Index({ fulltext: true })
    @Column()
    nameJob: string;

    @Column('decimal')
    salaryBefore: number;

    @Column('decimal')
    salaryAfter: number;

    @Column({
        type: "varchar",
        length: "50",
        nullable: true,
    })
    degree: string;

    @Column('text')
    address: string;

    @Column({
        type: "varchar",
        length: "50",
        nullable: false,
    })
    position: string;

    @Column()
    quantity: number;

    @Column('text')
    require: string;

    @Column()
    thumbnails: string;


    @Column({
        type: "timestamp with time zone",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP"
    })
    updatedAt: Date;

    @Column({
        type: "timestamp with time zone",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date;

    @BeforeUpdate()
    public setUpdatedAt() {
        this.updatedAt = new Date();
    }

    @BeforeInsert()
    public updateDates() {

        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @DeleteDateColumn()
    deletedAt?: Date;

}