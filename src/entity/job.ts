import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { NumberLiteralType } from "typescript";

export interface IJob {
    id: number;
    nameJob: string;
    salaryBefore: number;
    salaryAfter:number;
    degree: string;
    address: string;
}


@Entity()
export class Job extends BaseEntity implements IJob{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nameJob:string;
    
    @Column('decimal')
    salaryBefore: number;

    @Column('decimal')
    salaryAfter: number;

    @Column()
    degree:string;

    @Column()
    address:string;

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

} 