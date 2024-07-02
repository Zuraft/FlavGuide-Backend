import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityOnlyDate } from 'src/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'food' })
export class Food extends BaseEntityOnlyDate {
  @ApiProperty({ description: '음식 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '음식 이름' })
  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;
}
