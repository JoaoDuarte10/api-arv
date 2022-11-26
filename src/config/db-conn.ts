import { Pool, QueryResult } from 'pg';
import { DatabaseConfig } from './config';

export function database(dbConfig: DatabaseConfig) {
  const pool = new Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port,
  });
  return {
    query: async (text: string, params?: any[]) => {
      return pool.query(text, params);
    },
  };
}

export interface Database {
  query(text: string, params?: any[]): Promise<QueryResult<any>>;
}
