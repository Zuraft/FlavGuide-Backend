import { User } from 'src/entities/user.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'deleted_user' })
export class DeletedUser extends User {
  @PrimaryColumn({ name: 'uuid', type: 'varchar', length: 36 })
  id: string;

  @Column({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;

  group: null;
}
