import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TokensRepository } from '../../repository/services/tokens.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { TokenTypeEnum } from '../enums/token-type-enum';
import { UserMapper } from '../mapper/user.mapper';
import { TokenService } from '../services/token.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokensRepo: TokensRepository,
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.get('Authorization')?.split('Bearer ')[1];

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const payload = await this.tokenService.verifyToken(
      accessToken,
      TokenTypeEnum.ACCESS,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }
    const tokenInDb = await this.tokensRepo.findOneBy({
      user_id: payload.user_id,
    });
    if (!tokenInDb) {
      throw new UnauthorizedException();
    }
    const user = await this.userRepo.findOneBy({ id: payload.user_id });
    request.user = UserMapper.toUserData(user);
    return true;
  }
}
