import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../../config/db-conn';
import { SalesDTO } from './sales.dto';

@Injectable()
export class SalesRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly database: Database,
  ) {}

  async create(sales: SalesDTO): Promise<void> {
    const sql = {
      query: `INSERT INTO api_arv.sales (
                idusers,
                idclients,
                description,
                date,
                total,
                payment_status,
                payment_date
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7
            )`,
      values: [
        sales.idusers,
        sales.idclients,
        sales.description,
        sales.date,
        sales.total,
        sales.paymentStatus,
        sales.paymentDate,
      ],
    };
    await this.database.query(sql.query, sql.values);
  }

  async findByDate(idusers: number, date: string): Promise<SalesDTO[]> {
    const sql = {
      query: `SELECT * FROM api_arv.sales WHERE idusers = $1 AND date = $2`,
      values: [idusers, date],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return rows;
  }

  async findByPeriod(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<SalesDTO[]> {
    const sql = {
      query: `SELECT * FROM api_arv.sales WHERE idusers = $1 AND date BETWEEN $2 AND $3`,
      vales: [idusers, date1, date2],
    };
    const { rows } = await this.database.query(sql.query, sql.vales);
    return rows;
  }

  async findByClient(idusers: number, idclients: number): Promise<SalesDTO[]> {
    const sql = {
      query: `SELECT * FROM api_arv.sales WHERE idusers = $1 AND idclients = $2`,
      vales: [idusers, idclients],
    };
    const { rows } = await this.database.query(sql.query, sql.vales);
    return rows;
  }

  async findOne(idusers: number, idsales: number): Promise<SalesDTO> {
    const sql = {
      query: `SELECT * FROM api_arv.sales WHERE idusers = $1 AND idsales = $2`,
      vales: [idusers, idsales],
    };
    const { rows } = await this.database.query(sql.query, sql.vales);
    return rows[0];
  }

  async delete(idusers: number, idsales: number): Promise<void> {
    const sql = {
      query: `DELETE FROM api_arv.sales WHERE idusers = $1 AND idsales = $2`,
      values: [idusers, idsales],
    };
    await this.database.query(sql.query, sql.values);
  }

  async registerPayment(idusers: number, idsales: number): Promise<void> {
    const sql = {
      query: `UPDATE api_arv.sales SET payment_status = $1 WHERE idusers = $2`,
      values: [idusers, idsales],
    };
    await this.database.query(sql.query, sql.values);
  }
}
