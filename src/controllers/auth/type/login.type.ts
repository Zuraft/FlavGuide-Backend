import { ApiProperty } from '@nestjs/swagger';
import { ResponseBody, WithToken } from 'src/common/type/base.type';
import { User } from 'src/entities/user.entity';

export class LoginRequest implements Pick<User, 'loginId' | 'password'> {
  @ApiProperty({ description: '로그인 아이디' })
  loginId: string;

  @ApiProperty({ description: '비밀번호' })
  password: string;
}

class LoginResponseData extends WithToken implements Pick<User, 'id'> {
  @ApiProperty({ description: '유저 고유 UUID' })
  id: string;
}

export class LoginResponse extends ResponseBody {
  @ApiProperty({ description: '데이터' })
  data: LoginResponseData;
}
