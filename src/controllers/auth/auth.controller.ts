import { Body, Controller, Delete, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseBody } from 'src/type/base.type';
import {
  LoginRequest,
  LoginResponse,
} from 'src/controllers/auth/type/login.type';
import {
  RegisterRequest,
  RegisterResponse,
} from 'src/controllers/auth/type/register.type';
import { AuthService } from 'src/services/auth.service';

@Controller('')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiBody({
    type: RegisterRequest,
  })
  @ApiCreatedResponse({
    description: '회원가입 성공',
    type: RegisterResponse,
    example: {
      ok: true,
      status: 201,
      data: {
        id: 'uuid',
      },
    },
  })
  @ApiOperation({ summary: '회원가입' })
  async register(@Body() body: RegisterRequest) {
    const userId = await this.authService.registerUser(body);

    return {
      status: 201,
      ok: true,
      data: {
        id: userId,
      },
    };
  }

  @Post('/login')
  @ApiBody({
    type: LoginRequest,
  })
  @ApiCreatedResponse({
    description: '로그인 성공',
    type: LoginResponse,
    example: {
      ok: true,
      status: 200,
      data: {
        id: 'uuid',
        accessToken: 'accessToken',
      },
    },
  })
  @ApiOperation({ summary: '로그인' })
  async login(@Body() body: LoginRequest) {
    const user = await this.authService.validateUser(
      body.loginId,
      body.password,
    );

    const accessToken = this.authService.generateAccessToken(user);

    return {
      status: 200,
      ok: true,
      data: {
        id: user.id,
        accessToken,
      },
    };
  }
}
