import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  writer_idx: number;

  @Column()
  title: string;

  @Column()
  activity_type: string;

  @Column()
  description: string;

  @Column()
  max_participants: number;

  @Column()
  activity_date: string;

  @Column()
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'writer_idx' })
  writer: User;
} 