import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import DEFAULT_ERROR from 'src/common/error/default.error';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterRequest } from 'src/controllers/auth/type/register.type';
import USER_ERROR from 'src/common/error/user.error';
import { AccessTokenPayload } from 'src/type/tokenPayload.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginId: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { loginId } });
    if (!user) {
      throw DEFAULT_ERROR.INVALID_CREDENTIALS;
    }
    const encryptedPassword = user.password;
    if (!(await bcrypt.compare(password, encryptedPassword))) {
      throw DEFAULT_ERROR.INVALID_CREDENTIALS;
    }
    return user;
  }

  async checkDuplicateLoginId(loginId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { loginId } });
    if (!user) {
      return true;
    } else {
      throw USER_ERROR.DUPLICATE_LOGIN_ID;
    }
  }

  async registerUser(req: RegisterRequest): Promise<string> {
    await this.checkDuplicateLoginId(req.loginId);
    const encryptedPassword = await bcrypt.hash(
      req.password,
      parseInt(this.configService.get('SALT_ROUNDS')),
    );
    const user = await this.userRepository.save({
      loginId: req.loginId,
      password: encryptedPassword,
      name: req.name,
      birth: req.birth,
      height: req.height,
      weight: req.weight,
      favoriteFood: req.favoriteFood,
      allergy: req.allergy,
    });
    return user.id;
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload: AccessTokenPayload = {
      uuid: user.id,
      createdAt: new Date(),
      expiration: this.configService.get('JWT_ACCESS_EXPIRATION'),
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
    });
  }
}
