import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Participant } from './participant.entity';

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

  @Column('text')
  description: string;

  @Column()
  max_participants: number;

  @Column('date')
  activity_date: Date;

  @Column()
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'writer_idx' })
  writer: User;

  @OneToMany(() => Participant, participant => participant.post)
  participants: Participant[];
} 