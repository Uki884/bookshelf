import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Book } from './Book';

import { User } from './User';

@Entity()
export class BookShelf extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number | undefined;

  @Column()
  public name: string = '';

  @Column()
  public description: string = '';

  @OneToMany((type) => Book, (book) => book.bookshelf)
  books: Book[] | undefined;

  @ManyToOne((type) => User, (user) => user.bookShelf)
  user!: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date = new Date();
}

export default BookShelf;
