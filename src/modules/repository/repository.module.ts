import { Global, Module } from '@nestjs/common';

import { TokensRepository } from './services/tokens.repository';
import { UserRepository } from './services/user.repository';

@Global()
@Module({
  providers: [UserRepository, TokensRepository],
  exports: [UserRepository, TokensRepository],
})
export class RepositoryModule {}
