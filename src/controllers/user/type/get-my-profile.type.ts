import { ApiProperty } from '@nestjs/swagger';
import { Group } from 'src/entities/group.entity';
import { User } from 'src/entities/user.entity';
import { ResponseBody } from 'src/type/base.type';

class GroupData implements Pick<Group, 'id' | 'name'> {
  @ApiProperty({ description: '그룹 고유 UUID' })
  id: string;

  @ApiProperty({ description: '그룹 이름' })
  name: string;
}

class GetMyProfileResponseData
  implements Omit<User, 'loginId' | 'password' | 'group'>
{
  @ApiProperty({ description: '유저 고유 UUID' })
  id: string;

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

  @ApiProperty({ description: '그룹' })
  group: GroupData;

  @ApiProperty({ description: '생성일' })
  createdAt: Date;

  @ApiProperty({ description: '수정일' })
  updatedAt: Date;
}

export class GetMyProfileResponse extends ResponseBody {
  @ApiProperty({ description: '데이터' })
  data: GetMyProfileResponseData;
}
