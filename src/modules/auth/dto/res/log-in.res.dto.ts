import { BaseAuthResDto } from './base.auth.res.dto';
import { TokenPairResDto } from './token-pair.res.dto';

export class LogInResDto {
  user: BaseAuthResDto;
  tokens: TokenPairResDto;
}
