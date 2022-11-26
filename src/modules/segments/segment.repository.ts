import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../../config/db-conn';

@Injectable()
export class SegmentRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly database: Database,
  ) {}

  async findByName(input: { idusers: number; name: string }) {
    const sql = {
      text: 'SELECT * FROM api_arv.segments WHERE idusers = $1 AND name = $2',
      values: [input.idusers, input.name],
    };
    const { rows } = await this.database.query(sql.text, sql.values);
    return rows[0];
  }

  async find(idusers: number) {
    const { rows } = await this.database.query(
      'SELECT * FROM api_arv.segments WHERE idusers = $1 ORDER BY name',
      [idusers],
    );
    return rows;
  }

  async create(input: { idusers: number; name: string }) {
    const sql = {
      text: 'INSERT INTO api_arv.segments(idusers, name) VALUES($1, $2)',
      values: [input.idusers, input.name],
    };
    await this.database.query(sql.text, sql.values);
  }

  async update(input: {
    idsegments: number;
    idusers: number;
    segment: string;
  }) {
    const sql = {
      text: 'UPDATE api_arv.segments SET name = $1 WHERE idusers = $2 AND idsegments = $3',
      values: [input.segment, input.idusers, input.idsegments],
    };
    await this.database.query(sql.text, sql.values);
  }

  async delete(input: { idusers: number; idsegments: number }): Promise<void> {
    const sql = {
      text: 'DELETE FROM api_arv.segments WHERE idusers = $1 AND idsegments = $2',
      values: [input.idusers, input.idsegments],
    };
    await this.database.query(sql.text, sql.values);
  }
}
