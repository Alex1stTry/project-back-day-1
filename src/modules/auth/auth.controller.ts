import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from './decorator/current-user';
import { AuthLoginReqDto } from './dto/req/auth.login.req.dto';
import { AuthRegisterReqDto } from './dto/req/auth.register.req.dto';
import { ChangePasswordDto } from './dto/req/change-password.dto';
import { BaseAuthResDto } from './dto/res/base.auth.res.dto';
import { LogInResDto } from './dto/res/log-in.res.dto';
import { AccessGuard } from './guard/access.guard';
import { IUserData } from './interfaces/user-data.interface';
import { AuthService } from './services/auth.service';
import { UserMapper } from './services/user.mapper';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('register')
  public async register(
    @Body() dto: AuthRegisterReqDto,
  ): Promise<BaseAuthResDto> {
    const res = await this.authService.register(dto);
    return UserMapper.toResponseDTO(res);
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Post('log-in')
  public async logIn(@Body() dto: AuthLoginReqDto): Promise<LogInResDto> {
    return await this.authService.logIn(dto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @UseGuards(AccessGuard)
  @Get('me')
  public async me(@CurrentUser() userData: IUserData): Promise<BaseAuthResDto> {
    return await this.authService.me(userData);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiBearerAuth()
  @ApiForbiddenResponse()
  @Patch('change-password')
  public async changePassword(
    @CurrentUser() userData: IUserData,
    @Body() dto: ChangePasswordDto,
  ): Promise<void> {
    await this.authService.changePassword(userData, dto);
  }
}
