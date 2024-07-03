import { Controller, Delete, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseBody } from 'src/common/type/base.type';
import {
  LoginRequest,
  LoginResponse,
} from 'src/controllers/auth/type/login.type';
import {
  RegisterRequest,
  RegisterResponse,
} from 'src/controllers/auth/type/register.type';

@Controller('')
@ApiTags('Auth')
export class AuthController {
  constructor() {}

  @Post('/register')
  @ApiBody({
    type: RegisterRequest,
  })
  @ApiCreatedResponse({
    description: '회원가입 성공',
    type: RegisterResponse,
  })
  @ApiOperation({ summary: '회원가입' })
  async register() {
    return null;
  }

  @Post('/login')
  @ApiBody({
    type: LoginRequest,
  })
  @ApiCreatedResponse({
    description: '로그인 성공',
    type: LoginResponse,
  })
  @ApiOperation({ summary: '로그인' })
  async login() {
    return null;
  }

  @Post('/logout')
  @ApiOperation({ summary: '로그아웃' })
  @ApiCreatedResponse({
    description: '로그아웃 성공',
    type: ResponseBody,
  })
  async logout() {
    return null;
  }

  @Delete('/withdraw')
  @ApiOperation({ summary: '회원탈퇴' })
  @ApiCreatedResponse({
    description: '회원탈퇴 성공',
    type: ResponseBody,
  })
  async withdraw() {
    return null;
  }
}
