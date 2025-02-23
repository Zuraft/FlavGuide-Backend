import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DEFAULT_ERROR from 'src/common/error/default.error';
import USER_ERROR from 'src/common/error/user.error';
import { PutMyProfileRequest } from 'src/controllers/user/type/put-my-profile.type';
import { DeletedUser } from 'src/entities/deleted-user.entity';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(DeletedUser)
    private readonly deletedUserRepository: Repository<DeletedUser>,
    private readonly dataSource: DataSource,
  ) {}

  async findByUUID(uuid: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: uuid },
      relations: ['group'],
    });
    if (!user) {
      throw USER_ERROR.NOT_FOUND;
    }

    return user;
  }

  async update(uuid: string, body: PutMyProfileRequest): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: uuid } });
    if (!user) {
      throw USER_ERROR.NOT_FOUND;
    }

    await this.userRepository.update(user.id, body);
  }

  async delete(uuid: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: uuid } });
    if (!user) {
      throw USER_ERROR.NOT_FOUND;
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const deletedUser = this.deletedUserRepository.create({
        ...user,
        deletedAt: new Date(),
        group: null,
      });
      await this.deletedUserRepository.save(deletedUser);
      await this.userRepository.delete(user.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw DEFAULT_ERROR.UNKNOWN;
    } finally {
      await queryRunner.release();
    }
  }
}
