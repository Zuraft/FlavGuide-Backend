import { HttpException } from '@nestjs/common';

const USER_ERROR = {
  NOT_FOUND: new HttpException('사용자를 찾을 수 없습니다.', 404),
};

export default USER_ERROR;
