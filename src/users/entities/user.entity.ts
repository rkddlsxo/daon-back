import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  password: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 15, nullable: true, unique: true })
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  username: string;
} 