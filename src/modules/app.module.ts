import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/configs';
import { AuthModule } from './auth/auth.module';
import { PostgresModule } from './postgres/postgres.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    PostgresModule,
    RepositoryModule,
  ],
  providers: [],
})
export class AppModule {}
