import * as path from 'node:path';
import * as process from 'node:process';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import getter from './src/configs/configs';

dotenv.config({ path: './environments/local.env' });

const dbConfig = getter().pg;

export default new DataSource({
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.dbName,
  entities: [
    path.join(process.cwd(), 'src', 'database', 'entities', '*entity.ts'),
  ],
  migrations: [
    path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
  ],
  synchronize: false,
});
