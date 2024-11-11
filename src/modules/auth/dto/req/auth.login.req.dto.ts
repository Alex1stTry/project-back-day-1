import { PickType } from '@nestjs/swagger';

import { BaseAuthReqDto } from './base-auth.req.dto';

export class AuthLoginReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
]) {}
