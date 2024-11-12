import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

import { regexConstants } from '../../../../constants/regex-constants';
import { TransformHelper } from '../../../../helpres/transform-helper';
import { BaseAuthReqDto } from './base-auth.req.dto';

export class ChangePasswordDto extends PickType(BaseAuthReqDto, ['password']) {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(regexConstants.PASSWORD, { message: 'Incorrect password' })
  @Transform(TransformHelper.trim)
  newPassword: string;
}
