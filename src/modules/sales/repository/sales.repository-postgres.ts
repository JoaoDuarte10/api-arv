import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../../../config/db-conn';
import { SalesDTO, SalesStatus } from '../sales.dto';
import { SalesRepository } from './sales-repository';

@Injectable()
export class SalesRepositoryPostgres implements SalesRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly database: Database,
  ) {}

  async create(sales: SalesDTO): Promise<void> {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    const sql = {
      query: `INSERT INTO api_arv.sales (
                idusers,
                idclients,
                description,
                date,
                total,
                payment_status,
                payment_date,
                payment_method,
                created_at,
                client_name
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
            )`,
      values: [
        sales.idusers,
        sales.idclients,
        sales.description,
        sales.date,
        sales.total,
        sales.paymentStatus,
        sales.paymentDate,
        sales.paymentMethod,
        date,
        sales.clientName,
      ],
    };
    console.log(sql);
    await this.database.query(sql.query, sql.values);
  }

  async findByDate(idusers: number, date: string): Promise<SalesDTO[]> {
    const sql = {
      query: `SELECT
                s.idsales,
                c.name AS client,
                s.idclients,
                s.client_name,
                s.description,
                s.date,
                s.total,
                s.payment_status,
                s.payment_date,
                s.payment_method,
                s.created_at
              FROM api_arv.sales s
              LEFT JOIN api_arv.clients c ON s.idclients = c.idclients
              WHERE s.idusers = $1 AND s.date = $2
              ORDER BY s.date DESC;`,
      values: [idusers, date],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
  }

  async findByPeriod(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<SalesDTO[]> {
    const sql = {
      query: `SELECT
              s.idsales,
              c.name AS client,
              s.idclients,
              s.client_name,
              s.description,
              s.date,
              s.total,
              s.payment_status,
              s.payment_date,
              s.payment_method,
              s.created_at
            FROM api_arv.sales s
            LEFT JOIN api_arv.clients c ON s.idclients = c.idclients
            WHERE s.idusers = $1 AND s.date BETWEEN $2 AND $3
            ORDER BY s.date DESC;`,
      values: [idusers, date1, date2],
    };

    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
  }

  async findByClient(idusers: number, idclients: number): Promise<SalesDTO[]> {
    const sql = {
      query: `SELECT
                s.idsales,
                c.name AS client,
                s.idclients,
                s.client_name,
                s.description,
                s.date,
                s.total,
                s.payment_status,
                s.payment_date,
                s.payment_method,
                s.created_at
              FROM api_arv.sales s
              LEFT JOIN api_arv.clients c ON s.idclients = c.idclients
              WHERE s.idusers = $1 AND s.idclients = $2
              ORDER BY s.date DESC;`,
      values: [idusers, idclients],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
  }

  async findByAllFilters(params: {
    idusers: number;
    idclients: number;
    date: string;
    period: {
      date1: string;
      date2: string;
    };
    pending: boolean;
  }): Promise<SalesDTO[]> {
    const sql = {
      query: `SELECT
                s.idsales,
                c.name AS client,
                s.idclients,
                s.client_name,
                s.description,
                s.date,
                s.total,
                s.payment_status,
                s.payment_date,
                s.payment_method,
                s.created_at
              FROM api_arv.sales s
              LEFT JOIN api_arv.clients c ON s.idclients = c.idclients
              WHERE s.idusers = $1`,
      values: [params.idusers],
    };
    if (params.idclients) {
      sql.query += ` AND s.idclients = '${params.idclients.toString()}'`;
    }
    if (params.date) {
      sql.query += ` AND s.date = '${params.date.toString()}'`;
    }
    if (params.period.date1) {
      sql.query += ` AND s.date BETWEEN '${params.period.date1.toString()}' AND '${params.period.date2.toString()}'`;
    }
    if (params.pending) {
      sql.query += ` AND s.payment_status = '${
        params.pending ? SalesStatus.PENDING : SalesStatus.PAID
      }'`;
    }
    sql.query += ' ORDER BY s.date DESC';

    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
  }

  async findPending(idusers: number): Promise<SalesDTO[]> {
    const sql = {
      query: `SELECT
                s.idsales,
                c.name AS client,
                s.idclients,
                s.client_name,
                s.description,
                s.date,
                s.total,
                s.payment_status,
                s.payment_date,
                s.payment_method,
                s.created_at
              FROM api_arv.sales s
              LEFT JOIN api_arv.clients c ON s.idclients = c.idclients
              WHERE s.idusers = $1 AND s.payment_status = 'PENDING'
              ORDER BY s.date DESC;`,
      values: [idusers],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
  }

  async findPendingByClient(
    idusers: number,
    idclients: number,
  ): Promise<SalesDTO[]> {
    const sql = {
      query: `SELECT
                s.idsales,
                c.name AS client,
                s.idclients,
                s.client_name,
                s.description,
                s.date,
                s.total,
                s.payment_status,
                s.payment_date,
                s.payment_method,
                s.created_at
              FROM api_arv.sales s
              LEFT JOIN api_arv.clients c ON s.idclients = c.idclients
              WHERE s.idusers = $1 AND s.payment_status = 'PENDING' AND s.idclients = $2
              ORDER BY s.date DESC;`,
      values: [idusers, idclients],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
  }

  async findOne(idusers: number, idsales: number): Promise<SalesDTO> {
    const sql = {
      query: `SELECT
                s.idsales,
                c.name AS client,
                s.idclients,
                s.client_name,
                s.description,
                s.date,
                s.total,
                s.payment_status,
                s.payment_date,
                s.payment_method,
                s.created_at
              FROM api_arv.sales s
              LEFT JOIN api_arv.clients c ON s.idclients = c.idclients
              WHERE s.idusers = $1 AND s.idsales = $2
              ORDER BY s.date DESC;`,
      values: [idusers, idsales],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows)[0];
  }

  async delete(idusers: number, idsales: number): Promise<void> {
    const sql = {
      query: `DELETE FROM api_arv.sales WHERE idusers = $1 AND idsales = $2`,
      values: [idusers, idsales],
    };
    await this.database.query(sql.query, sql.values);
  }

  async registerPayment(idusers: number, idsales: number): Promise<void> {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    const sql = {
      query: `UPDATE api_arv.sales SET payment_status = $1, payment_date = $2, updated_at = $3 WHERE idusers = $4 AND idsales = $5`,
      values: [SalesStatus.PAID, date, date, idusers, idsales],
    };
    await this.database.query(sql.query, sql.values);
  }

  async getBasicInfoReports(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<any> {
    const sql = {
      query: `SELECT
                sum(total) as total,
                count(idsales) as quantity,
                avg(total) as average,
                count(idclients) as count_clients,
                max(total) as biggest_sale,
                min(total) as lowest_sale
              FROM api_arv.sales
              WHERE idusers = $1 AND date BETWEEN $2 AND $3 AND payment_status = 'PAID';`,
      values: [idusers, date1, date2],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows[0]);
  }

  async getBiggestTotalWithRangeDate(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<any> {
    const sql = {
      query: `SELECT
                SUM(total) AS total,
                COUNT(total) AS count_total,
                date
              FROM api_arv.sales
              WHERE idusers = $1 AND date BETWEEN $2 AND $3 AND payment_status = 'PAID'
              GROUP BY(date, total)
              ORDER BY SUM(total)
              DESC LIMIT 1`,
      values: [idusers, date1, date2],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows[0]);
  }

  async getLowestTotalWithRangeDate(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<any> {
    const sql = {
      query: `SELECT
                SUM(total) AS total,
                COUNT(total) AS count_total,
                date
              FROM api_arv.sales
              WHERE idusers = $1 AND date BETWEEN $2 AND $3 AND payment_status = 'PAID'
              GROUP BY(date, total)
              ORDER BY SUM(total)
              LIMIT 1`,
      values: [idusers, date1, date2],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows[0]);
  }

  private normalizePayload(sales: any[]): SalesDTO[] {
    return sales && sales.length
      ? sales.map((sale) => {
          return {
            idsales: sale.idsales,
            idclients: sale.idclients,
            clientName: sale.client_name,
            client: sale.client,
            description: sale.description,
            date: sale.date,
            total: sale.total,
            paymentStatus: sale.payment_status,
            paymentDate: sale.payment_date,
            paymentMethod: sale.payment_method,
            createdAt: sale.created_at,
            updatedAt: sale.updated_at,
          };
        })
      : sales;
  }
}
