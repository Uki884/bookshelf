import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { BookShelf } from './BookShelf';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number | undefined;

  @Column()
  public auth0Id: string = '';

  @Column()
  public name: string = '';

  @Column()
  public email: string = '';

  @OneToMany((type) => BookShelf, (bookshelf) => bookshelf.user)
  bookShelf: BookShelf[] | undefined;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date = new Date();
}

export default User;
