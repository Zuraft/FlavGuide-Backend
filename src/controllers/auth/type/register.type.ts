import { ApiProperty } from '@nestjs/swagger';
import { ResponseBody, WithToken } from 'src/type/base.type';
import { User } from 'src/entities/user.entity';

export class RegisterRequest
  implements
    Pick<
      User,
      | 'loginId'
      | 'password'
      | 'name'
      | 'birth'
      | 'height'
      | 'weight'
      | 'favoriteFood'
      | 'allergy'
    >
{
  @ApiProperty({ description: '로그인 아이디' })
  loginId: string;

  @ApiProperty({ description: '비밀번호' })
  password: string;

  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '생년월일' })
  birth: Date;

  @ApiProperty({ description: '키' })
  height: number;

  @ApiProperty({ description: '몸무게' })
  weight: number;

  @ApiProperty({ description: '좋아하는 음식' })
  favoriteFood: number[];

  @ApiProperty({ description: '알러지' })
  allergy: number[];
}

class RegisterResponseData extends WithToken implements Pick<User, 'id'> {
  @ApiProperty({ description: '유저 고유 UUID' })
  id: string;
}

export class RegisterResponse extends ResponseBody {
  @ApiProperty({ description: '데이터' })
  data: RegisterResponseData;
}
