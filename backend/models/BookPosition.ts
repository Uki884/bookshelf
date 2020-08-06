import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { Book } from '@/models/Book';

@Entity()
export class BookPosition extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number | undefined;

  @Column('integer')
  public column_no: number | undefined;

  @Column('integer')
  public row_no: number | undefined;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date = new Date();
}

export default BookPosition;
