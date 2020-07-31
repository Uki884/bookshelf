import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Books extends BaseEntity {
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date = new Date();
}

export default Books;
