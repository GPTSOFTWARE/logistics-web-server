import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn } from "typeorm";

export class AbstractBase {
    @Column({
        type: 'timestamp',
        nullable: true,
        default:Date.now
    })
    public updatedAt: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
        default:Date.now
    })
    public createdAt: Date;

    @Column({ nullable: true })
    public updatedBy: number;

    @Column({ nullable: true })
    public createdBy: number;

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
