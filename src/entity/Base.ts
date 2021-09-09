import { BeforeInsert, BeforeUpdate, Column } from "typeorm";

export abstract class AbstractBase {
    @Column({
        type: 'timestamp',
        nullable: true
    })
    public updatedAt: number;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    public createdAt: number;

    @Column({ nullable: true })
    public updatedBy: number;

    @Column({ nullable: false })
    public createdBy: number;

    @BeforeUpdate()
    public setUpdatedAt() {
        this.updatedAt = Math.floor(Date.now() / 1000);
    }

    @BeforeInsert()
    public updateDates() {
        const time = Math.floor(Date.now() / 1000);
        this.createdAt = time;
        this.updatedAt = time;
    }
}
