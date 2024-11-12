import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
