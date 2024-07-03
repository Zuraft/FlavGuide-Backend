import { ApiProperty } from '@nestjs/swagger';

export class ResponseBody {
  @ApiProperty({ description: '상태 코드' })
  status: number;

  @ApiProperty({ description: '성공 여부' })
  ok: boolean;
}

export class WithToken {
  @ApiProperty({ description: 'Access Token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh Token' })
  refreshToken: string;
}
