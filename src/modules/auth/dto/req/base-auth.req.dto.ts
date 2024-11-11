import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { regexConstants } from '../../../../constants/regex-constants';
import { TransformHelper } from '../../../../helpres/transform-helper';

export class BaseAuthReqDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  @Transform(TransformHelper.trim)
  public readonly name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Matches(regexConstants.EMAIL, { message: 'Incorrect email' })
  @Transform(TransformHelper.trim)
  public readonly email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(regexConstants.PASSWORD, { message: 'Incorrect password' })
  @Transform(TransformHelper.trim)
  public readonly password: string;

  @IsOptional()
  @IsString()
  public readonly avatar?: string;
}
