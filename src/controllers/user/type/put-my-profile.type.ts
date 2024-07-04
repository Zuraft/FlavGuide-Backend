import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class PutMyProfileRequest
  implements
    Omit<
      User,
      'id' | 'loginId' | 'password' | 'group' | 'createdAt' | 'updatedAt'
    >
{
  @ApiProperty({ description: '유저 이름' })
  name: string;

  @ApiProperty({ description: '유저 생년월일' })
  birth: Date;

  @ApiProperty({ description: '유저 키' })
  height: number;

  @ApiProperty({ description: '유저 몸무게' })
  weight: number;

  @ApiProperty({ description: '유저 좋아하는 음식' })
  favoriteFood: number[];

  @ApiProperty({ description: '유저 알러지' })
  allergy: number[];
}
