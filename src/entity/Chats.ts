import {
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { AbstractBase } from './Base';
import { User } from './Users';

@Entity()
export class Chats extends AbstractBase {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user1_id' })
    public user1: User

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user2_id' })
    public user2: User

}