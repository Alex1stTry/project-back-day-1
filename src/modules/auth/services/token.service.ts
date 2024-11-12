import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Configs, TokensConfig } from '../../../configs/configs-type';
import { TokenTypeEnum } from '../enums/token-type-enum';
import { IJWTPayload } from '../interfaces/jwt-payload';
import { ITokens } from '../interfaces/token.interface';

@Injectable()
export class TokenService {
  private readonly JWTConfig: TokensConfig;

  constructor(
    private readonly configService: ConfigService<Configs>,
    private readonly jwtService: JwtService,
  ) {
    this.JWTConfig = configService.get<TokensConfig>('tokens');
  }
  public async generateTokens(payload: IJWTPayload): Promise<ITokens> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.JWTConfig.access_secret,
      expiresIn: this.JWTConfig.refresh_expires_in,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.JWTConfig.refresh_secret,
      expiresIn: this.JWTConfig.refresh_expires_in,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async verifyToken(
    token: string,
    type: TokenTypeEnum,
  ): Promise<IJWTPayload> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.getSecret(type),
    });
  }

  private getSecret(type: TokenTypeEnum) {
    let secret: string;
    switch (type) {
      case TokenTypeEnum.ACCESS:
        secret = this.JWTConfig.access_secret;
        break;
      case TokenTypeEnum.REFRESH:
        secret = this.JWTConfig.refresh_secret;
        break;
    }
    return secret;
  }
}
