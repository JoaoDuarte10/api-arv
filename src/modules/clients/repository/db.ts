import { Pool } from 'pg';

const pool = new Pool();

export const database = {
  query: async (text: string, params?: any[]) => {
    return pool.query(text, params);
  },
};
