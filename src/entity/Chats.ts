import {
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { AbstractBase } from './Base';
import { Account } from './Users';

@Entity()
export class Chats extends AbstractBase {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'user1_id' })
    public user1: Account;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'user2_id' })
    public user2: Account

}