import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityOnlyDate } from 'src/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'allergy' })
export class Allergy extends BaseEntityOnlyDate {
  @ApiProperty({ description: '알레르기 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '알레르기 이름' })
  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;
}
