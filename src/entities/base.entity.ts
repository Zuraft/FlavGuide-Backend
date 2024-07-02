import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntityOnlyDate {
  @ApiProperty({ description: '생성일자' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정일자' })
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export class BaseEntity extends BaseEntityOnlyDate {
  @ApiProperty({ description: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
