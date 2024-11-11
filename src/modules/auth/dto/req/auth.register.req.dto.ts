import { PickType } from '@nestjs/swagger';

import { BaseAuthReqDto } from './base-auth.req.dto';

export class AuthRegisterReqDto extends PickType(BaseAuthReqDto, [
  'name',
  'email',
  'password',
  'avatar',
]) {}
