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

export interface IMessage {
    id : number;
    content : string;
    see: boolean;
}

@Entity()
export class Message extends BaseEntity implements IMessage {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column('text')
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