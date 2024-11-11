import * as path from 'node:path';
import * as process from 'node:process';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Configs, PostgresConfig } from '../../configs/configs-type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService<Configs>) => {
        const pgConfig = configService.get<PostgresConfig>('pg');
        return {
          type: 'postgres',
          host: pgConfig.host,
          port: pgConfig.port,
          username: pgConfig.user,
          password: pgConfig.password,
          database: pgConfig.dbName,
          entities: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'entities',
              '*entity.js',
            ),
          ],
          migrations: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'migrations',
              '*.js',
            ),
          ],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}
