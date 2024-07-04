import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { LoginGuard } from 'src/common/guard/login.guard';
import { GetMyProfileResponse } from 'src/controllers/user/type/get-my-profile.type';
import { PutMyProfileRequest } from 'src/controllers/user/type/put-my-profile.type';
import { UserService } from 'src/services/user.service';
import { ResponseBody } from 'src/type/base.type';
import { AccessTokenPayload } from 'src/type/tokenPayload.type';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiOperation({ summary: '내 프로필 조회' })
  @ApiCreatedResponse({
    description: '내 프로필 조회 성공',
    type: GetMyProfileResponse,
    example: {
      ok: true,
      status: 200,
      data: {
        id: 'uuid',
        name: '이름',
        birth: new Date(),
        height: 179.9,
        weight: 70.5,
        favoriteFood: [1, 2, 3],
        allergy: [1, 2, 3],
        group: {
          id: 'uuid',
          name: '그룹 이름',
        },
      },
    },
  })
  @UseGuards(LoginGuard)
  async getMyProfile(@Req() req: Request & { user: AccessTokenPayload }) {
    const userId = req.user.uuid;
    const user = await this.userService.findByUUID(userId);
    return {
      status: 200,
      ok: true,
      data: {
        id: user.id,
        loginId: user.loginId,
        name: user.name,
        birth: user.birth,
        height: user.height,
        weight: user.weight,
        favoriteFood: user.favoriteFood,
        allergy: user.allergy,
        group: user?.group
          ? {
              id: user.group.id,
              name: user.group.name,
            }
          : null,
      },
    };
  }

  @Put('/me')
  @ApiOperation({ summary: '내 프로필 수정' })
  @ApiBody({
    type: PutMyProfileRequest,
    examples: {
      example: {
        value: {
          name: '이름',
          birth: new Date(),
          height: 179.9,
          weight: 70.5,
          favoriteFood: [1, 2, 3],
          allergy: [1, 2, 3],
        },
      },
    },
  })
  @UseGuards(LoginGuard)
  @ApiCreatedResponse({
    description: '내 프로필 수정 성공',
    type: ResponseBody,
    example: {
      ok: true,
      status: 200,
    },
  })
  async updateMyProfile(
    @Req() req: Request & { user: AccessTokenPayload },
    @Body() body: PutMyProfileRequest,
  ) {
    const userId = req.user.uuid;
    await this.userService.update(userId, body);

    return {
      status: 200,
      ok: true,
    };
  }

  @Delete('/me')
  @ApiOperation({ summary: '회원탈퇴' })
  @ApiCreatedResponse({
    description: '회원탈퇴 성공',
    type: ResponseBody,
    example: {
      ok: true,
      status: 200,
    },
  })
  @UseGuards(LoginGuard)
  async withdraw(@Req() req: Request & { user: AccessTokenPayload }) {
    const uuid = req.user.uuid;
    await this.userService.delete(uuid);

    return {
      status: 200,
      ok: true,
    };
  }
}
