import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from './post.entity';

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  post_idx: number;

  @Column()
  user_idx: number;

  @CreateDateColumn()
  participation_date: Date;

  @ManyToOne(() => Post, post => post.participants)
  @JoinColumn({ name: 'post_idx' })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_idx' })
  user: User;
} 