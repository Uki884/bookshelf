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

import { BookShelf } from './BookShelf';
import { BookPosition } from './BookPosition';

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
  public bookPositionId: number | undefined;

  @OneToOne((type) => BookPosition, { cascade: true })
  @JoinColumn([
    {
      name: 'bookPositionId',
      referencedColumnName: 'id',
    },
  ])
  bookPosition: BookPosition | undefined;

  @ManyToOne((type) => BookShelf, (bookShelf) => bookShelf.books, { onDelete: 'CASCADE' })
  bookshelf!: BookShelf;

  @CreateDateColumn({ name: 'created_at', precision: 0, default: () => 'NOW()' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: 'updated_at', precision: 0, default: () => 'NOW()' })
  updatedAt: Date = new Date();
}

export default Book;
