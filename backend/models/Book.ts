import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { BookShelf } from '@/models/BookShelf.ts';
import { BookPosition } from '@/models/BookPosition';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number | undefined;

  @Column()
  public title: string = '';

  @Column()
  public author: string = '';

  @Column()
  public cover: string = '';

  @Column()
  public isbn: string = '';

  @Column()
  public price: string = '';

  @Column()
  public publisher: string = '';

  @Column()
  public image: string = '';

  @Column()
  public bookPostionId: number | undefined;

  @OneToOne(() => BookPosition)
  @JoinColumn([
    {
      name: 'bookPostionId',
      referencedColumnName: 'id',
    },
  ])
  bookPostion: BookPosition | undefined;

  @ManyToOne((type) => BookShelf, (bookShelf) => bookShelf.books)
  bookshelf!: BookShelf;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date = new Date();
}

export default Book;
