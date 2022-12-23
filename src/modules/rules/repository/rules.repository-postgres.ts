import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../../../config/db-conn';
import { RulesDTO } from '../rules.dto';
import { RulesRepository } from './rules.repository';

@Injectable()
export class RulesRepositoryPostgres implements RulesRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly database: Database,
  ) {}

  async create(rule: RulesDTO): Promise<void> {
    const sql = {
      query: `INSERT INTO api_arv.rules (
                name,
                description
              ) VALUES (
                  $1, $2
              );`,
      values: [rule.name, rule.description],
    };
    await this.database.query(sql.query, sql.values);
  }

  async disable(idrules: number): Promise<void> {
    const sql = {
      query: `UPDATE api_arv.rules SET has_active = $1 WHERE idrules = $2`,
      values: [false, idrules],
    };
    await this.database.query(sql.query, sql.values);
  }

  async enable(idrules: number): Promise<void> {
    const sql = {
      query: `UPDATE api_arv.rules SET has_active = $1 WHERE idrules = $2`,
      values: [true, idrules],
    };
    await this.database.query(sql.query, sql.values);
  }

  async findRuleById(idrules: number): Promise<any> {
    const sql = {
      query:
        'SELECT * FROM api_arv.rules WHERE idrules = $1 AND has_active = true',
      values: [idrules],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return rows[0];
  }

  async findRuleByName(name: string): Promise<any> {
    const sql = {
      query:
        'SELECT * FROM api_arv.rules WHERE name = $1 AND has_active = true',
      values: [name],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return rows[0];
  }

  async findAll(): Promise<any> {
    const { rows } = await this.database.query(
      'SELECT * FROM api_arv.rules WHERE has_active = true',
    );
    return rows;
  }

  async findByUser(idusers: number): Promise<any> {
    const sql = {
      query: `SELECT
                cr.idclients_rules,
                r.idrules,
                r."name",
                r.description,
                cr.created_at
              FROM api_arv.clients_rules cr
              INNER JOIN api_arv.rules r ON cr.idrules = r.idrules
              WHERE cr.idusers = $1 AND r.has_active = true;
            `,
      values: [idusers],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return rows;
  }

  async findRuleByUser(idusers: number, idrules: number): Promise<boolean> {
    const sql = {
      query:
        'SELECT * FROM api_arv.clients_rules WHERE idusers = $1 AND idrules = $2',
      values: [idusers, idrules],
    };

    const { rows } = await this.database.query(sql.query, sql.values);
    return rows.length > 0;
  }

  async createWithUser(idusers: number, idrules: number): Promise<void> {
    const sql = {
      query: `INSERT INTO api_arv.clients_rules (
                idrules,
                idusers
              ) VALUES (
                  $1, $2
              );`,
      values: [idrules, idusers],
    };
    await this.database.query(sql.query, sql.values);
  }

  async removeRuleWithUser(idusers: number, idrules: number): Promise<void> {
    const sql = {
      query: `DELETE FROM api_arv.clients_rules WHERE idusers = $1 AND idrules = $2`,
      values: [idusers, idrules],
    };
    await this.database.query(sql.query, sql.values);
  }
}
