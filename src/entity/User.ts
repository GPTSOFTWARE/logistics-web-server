import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity('hungtest')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // @Column()
    // email: string;

    @Column()
    public: boolean;
}