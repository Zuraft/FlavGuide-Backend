import { BaseEntity } from 'src/entities/base.entity';
import { User } from 'src/entities/user.entity';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';

@Entity({ name: 'group' })
export class Group extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => User, (user) => user.group)
  @JoinTable({
    name: 'user_group',
    joinColumn: { name: 'group_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}
