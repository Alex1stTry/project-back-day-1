import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../../../database/entities/user.entity';
import { TokensRepository } from '../../repository/services/tokens.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { AuthLoginReqDto } from '../dto/req/auth.login.req.dto';
import { AuthRegisterReqDto } from '../dto/req/auth.register.req.dto';
import { ChangePasswordDto } from '../dto/req/change-password.dto';
import { BaseAuthResDto } from '../dto/res/base.auth.res.dto';
import { LogInResDto } from '../dto/res/log-in.res.dto';
import { IUserData } from '../interfaces/user-data.interface';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokenService: TokenService,
    private readonly tokenRepo: TokensRepository,
  ) {}

  public async register(dto: AuthRegisterReqDto): Promise<UserEntity> {
    await this.isEmailTaken(dto.email);
    const hashedPass = bcrypt.hashSync(dto.password, 5);

    return await this.userRepo.save(
      this.userRepo.create({ ...dto, password: hashedPass }),
    );
  }

  public async logIn(dto: AuthLoginReqDto): Promise<LogInResDto> {
    const user = await this.userRepo.findOneBy({ email: dto.email });
    if (!user) {
      throw new UnauthorizedException();
    }
    const password = bcrypt.compareSync(dto.password, user.password);
    if (!password) {
      throw new UnauthorizedException();
    }

    const tokens = await this.tokenService.generateTokens({
      user_id: user.id,
      role: user.role,
    });

    await Promise.all([
      this.tokenRepo.delete({
        user_id: user.id,
      }),
      this.tokenRepo.save({
        user_id: user.id,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }),
    ]);
    return {
      user,
      tokens,
    };
  }

  public async me(userData: IUserData): Promise<BaseAuthResDto> {
    Logger.log(userData);
    return await this.userRepo.findOneBy({ id: userData.id });
  }

  public async changePassword(
    userData: IUserData,
    dto: ChangePasswordDto,
  ): Promise<void> {
    Logger.log(userData);
    const user = await this.userRepo.findOneBy({ email: userData.email });

    const validPass = bcrypt.compareSync(user.password, dto.password);
    if (!validPass) {
      throw new ForbiddenException('Invalid Pass');
    }
    const newPassword = bcrypt.hashSync(dto.newPassword, 5);

    await this.userRepo.update({ id: user.id }, { password: newPassword });
  }

  private async isEmailTaken(email: string): Promise<any> {
    const takenEmail = await this.userRepo.findOneBy({ email });
    if (takenEmail) {
      throw new ConflictException();
    }
  }
}
