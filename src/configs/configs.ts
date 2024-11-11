import * as process from 'node:process';

import { Configs } from './configs-type';

export default (): Configs => ({
  app: {
    host: process.env.APP_HOST,
    port: Number(process.env.APP_PORT),
  },
  pg: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DB,
  },
});