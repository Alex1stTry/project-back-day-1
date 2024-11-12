export type Configs = {
  app: AppConfig;
  pg: PostgresConfig;
  tokens: TokensConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type PostgresConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
};

export type TokensConfig = {
  access_secret: string;
  access_expires_in: number;
  refresh_secret: string;
  refresh_expires_in: number;
};
