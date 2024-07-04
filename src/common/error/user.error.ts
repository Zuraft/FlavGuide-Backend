import { HttpException } from '@nestjs/common';

const USER_ERROR = {
  NOT_FOUND: new HttpException('사용자를 찾을 수 없습니다.', 404),
  DUPLICATE_LOGIN_ID: new HttpException('중복된 로그인 아이디입니다.', 400),
};

export default USER_ERROR;
