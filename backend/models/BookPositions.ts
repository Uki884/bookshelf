import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BookPositions extends BaseEntity {
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

export default BookPositions;
