/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource } from 'typeorm';
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

require('dotenv').config();

const postgresConnection = {
  type: process.env.DBTYPE,
  host: process.env.PGHOST,
  port: Number(process.env.DB_PORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DB_NAME
      : process.env.PGDATABASE,
  synchronize: process.env.NODE_ENV === 'test',
  connectTimeoutMS: 30000,
  logNotifications: true,
  logging: 'all',
  logger: 'advanced-console',
  extra: {
    ssl: process.env.DB_SSL === 'true',
    rejectUnauthorized: false,
    query_timeout: 90000,
  },
};

const typeOrmConfig = {
  ...postgresConnection,
  entities: ['./src/**/*.entity.{js,ts}'],
  migrations: ['./src/migrations/*.{js,ts}'],
  logging: process.env.NODE_ENV === 'development',
  keepConnectionAlive: process.env.NODE_ENV === 'test',
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/migrations',
  },
};

console.log('==== CLI OPTIONS ====');
console.log({ ...typeOrmConfig, password: '*****' });
console.log('=====================');

export default new DataSource(typeOrmConfig as PostgresConnectionOptions);
