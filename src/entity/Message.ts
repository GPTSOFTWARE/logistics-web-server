import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Account } from './Users';
import { Chats } from './Chats';


@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public content: string;

    @Column({ default: false })
    public see: boolean

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'sender_id' })
    public sender: Account;

    @ManyToOne(() => Chats)
    @JoinColumn({ name: 'chat_id' })
    public chat: Chats
}