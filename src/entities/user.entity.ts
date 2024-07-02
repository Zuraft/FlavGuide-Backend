import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, ValueTransformer } from 'typeorm';

class NumberListTransformer implements ValueTransformer {
  to(value: number[]) {
    return value.join(',');
  }

  from(value: string) {
    return value.split(',').map((v) => parseInt(v, 10));
  }
}

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @ApiProperty({ description: '아이디' })
  @Column({ name: 'login_id', type: 'varchar', length: 50, unique: true })
  loginId: string;

  @ApiProperty({ description: '비밀번호' })
  @Column({ name: 'password', type: 'varchar', length: 100 })
  password: string;

  @ApiProperty({ description: '이름' })
  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({ description: '생년월일' })
  @Column({ name: 'date_of_birth', type: 'date' })
  birth: Date;

  @ApiProperty({ description: '키' })
  @Column({ name: 'height', type: 'decimal', precision: 4, scale: 1 })
  height: number;

  @ApiProperty({ description: '몸무게' })
  @Column({ name: 'weight', type: 'decimal', precision: 4, scale: 1 })
  weight: number;

  @ApiProperty({ description: '선호하는 음식' })
  @Column({
    name: 'favorite_food',
    type: 'longtext',
    transformer: new NumberListTransformer(),
  })
  favoriteFood: number[];

  @ApiProperty({ description: '알레르기' })
  @Column({
    name: 'allergy',
    type: 'longtext',
    transformer: new NumberListTransformer(),
  })
  allergy: number[];
}
