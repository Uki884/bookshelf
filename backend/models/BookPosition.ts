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

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date | undefined;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date | undefined;
}

export default BookPosition;
