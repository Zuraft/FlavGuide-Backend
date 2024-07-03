import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntityOnlyDate {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export class BaseEntity extends BaseEntityOnlyDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
