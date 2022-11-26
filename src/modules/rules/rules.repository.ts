import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../../config/db-conn';
import { RulesDTO } from './rules.dto';

@Injectable()
export class RulesRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly database: Database,
  ) {}

  async create(rule: RulesDTO) {
    const sql = {
      text: `INSERT INTO api_arv.rules (
                name,
                description
            ) VALUES (
                $1, $2
            );`,
      values: [rule.name, rule.description],
    };
    await this.database.query(sql.text, sql.values);
  }

  async disable(idrules: number) {
    const sql = {
      query: `UPDATE api_arv.rules SET(has_active) VALUES($1)`,
      values: [idrules],
    };
    await this.database.query(sql.query, sql.values);
  }

  async findAll() {
    const { rows } = await this.database.query('SELECT * FROM api_arv.rules');
    return rows;
  }

  async findByUser(idusers: number) {
    const sql = {
      query: `SELECT * FROM api_arv.clients_rules WHERE idusers = $1`,
      values: [idusers],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return rows;
  }

  async createWithUser(idusers: number, idrules: number) {
    const sql = {
      text: `INSERT INTO api_arv.clients_rules (
                idrules,
                idusers,
            ) VALUES (
                $1, $2
            );`,
      values: [idrules, idusers],
    };
    await this.database.query(sql.text, sql.values);
  }
}
