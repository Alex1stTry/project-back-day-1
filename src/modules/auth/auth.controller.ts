import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthRegisterReqDto } from './dto/req/auth.register.req.dto';
import { BaseAuthResDto } from './dto/res/base.auth.res.dto';
import { AuthService } from './services/auth.service';
import { UserMapper } from './services/user.mapper';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse()
  @Post('register')
  public async register(
    @Body() dto: AuthRegisterReqDto,
  ): Promise<BaseAuthResDto> {
    const res = await this.authService.register(dto);
    return UserMapper.toResponseDTO(res);
  }
}
