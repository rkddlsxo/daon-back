import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../volunteers/entities/post.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  post_idx: number;

  @Column()
  user_idx: number;

  @Column()
  rating: number;

  @Column('text')
  review_text: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_idx' })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_idx' })
  user: User;
} 