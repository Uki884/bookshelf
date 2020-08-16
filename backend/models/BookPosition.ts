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

@Entity()
export class BookPosition extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number | undefined;

  @Column('integer')
  public column_no: number | undefined;

  @Column('integer')
  public row_no: number | undefined;

  @CreateDateColumn({ name: 'created_at', precision: 0, default: () => 'NOW()' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: 'updated_at', precision: 0, default: () => 'NOW()' })
  updatedAt: Date = new Date();
}

export default BookPosition;
