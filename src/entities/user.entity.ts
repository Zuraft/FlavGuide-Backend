import { BaseEntity } from 'src/entities/base.entity';
import { Group } from 'src/entities/group.entity';
import { Column, Entity, ManyToOne, ValueTransformer } from 'typeorm';

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
  @Column({ name: 'login_id', type: 'varchar', length: 50, unique: true })
  loginId: string;

  @Column({ name: 'password', type: 'varchar', length: 100 })
  password: string;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  birth: Date;

  @Column({ name: 'height', type: 'decimal', precision: 4, scale: 1 })
  height: number;

  @Column({ name: 'weight', type: 'decimal', precision: 4, scale: 1 })
  weight: number;

  @Column({
    name: 'favorite_food',
    type: 'longtext',
    transformer: new NumberListTransformer(),
  })
  favoriteFood: number[];

  @Column({
    name: 'allergy',
    type: 'longtext',
    transformer: new NumberListTransformer(),
  })
  allergy: number[];

  @ManyToOne(() => Group, (group) => group.users)
  group: Group;
}
