import { OutgoingDTO } from '../outgoing.dto';
import { OutgoingRepository } from './outgoing.repository';
import { Inject } from '@nestjs/common';
import { Database } from '../../../config/db-conn';

export class OutgoingRepositoryPostgres implements OutgoingRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly database: Database,
  ) {}

  async create(params: OutgoingDTO): Promise<void> {
    const sql = {
      query: `INSERT INTO api_arv.outgoing (
                      idusers,
                      description,
                      date,
                      total,
                      payment_method,
                      installment
                  ) VALUES (
                      $1, $2, $3, $4, $5, $6
                  )`,
      values: [
        params.idusers,
        params.description,
        params.date,
        params.total,
        params.paymentMethod,
        params.installment,
      ],
    };
    await this.database.query(sql.query, sql.values);
  }

  async getAll(idusers: number): Promise<OutgoingDTO[]> {
    const sql = {
      query: `SELECT * FROM api_arv.outgoing WHERE idusers = $1`,
      values: [idusers],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
  }

  async getByDate(idusers: number, date: Date): Promise<OutgoingDTO[]> {
    const sql = {
      query: `SELECT * FROM api_arv.outgoing WHERE idusers = $1 AND date = $2`,
      values: [idusers, date],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
  }

  async getByPeriod(
    idusers: number,
    date1: Date,
    date2: Date,
  ): Promise<OutgoingDTO[]> {
    const sql = {
      query: `SELECT * FROM api_arv.outgoing WHERE idusers = $1 AND date BETWEEN $2 AND $3`,
      values: [idusers, date1, date2],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
  }

  private normalizePayload(outgoings: any[]): OutgoingDTO[] {
    return outgoings.length
      ? outgoings.map((outgoing) => {
          return {
            idoutgoing: outgoing.idoutgoing,
            description: outgoing.description,
            date: outgoing.date,
            total: outgoing.total,
            paymentMethod: outgoing.payment_method,
            installment: outgoing.installment,
            createdAt: outgoing.created_at,
            updatedAt: outgoing.updated_at,
          };
        })
      : outgoings;
  }
}
