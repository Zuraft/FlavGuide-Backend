import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import DEFAULT_ERROR from 'src/common/error/default.error';
import { AuthService } from 'src/services/auth.service';
import { AccessTokenPayload } from 'src/type/tokenPayload.type';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const accessToken = request.headers['authorization'];

      if (!accessToken) {
        throw DEFAULT_ERROR.NEED_LOGIN;
      }

      const payload: AccessTokenPayload = this.jwtService.verify(accessToken, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });

      request.user = payload;
      return true;
    } catch (err) {
      if (err.name === 'HttpException') {
        throw err;
      } else if (err.name === 'JsonWebTokenError') {
        if (err.message === 'jwt expired') {
          throw DEFAULT_ERROR.EXPIRED_TOKEN;
        } else {
          throw DEFAULT_ERROR.INVALID_TOKEN;
        }
      } else {
        console.log(err);
        throw DEFAULT_ERROR.UNKNOWN;
      }
    }
  }
}
