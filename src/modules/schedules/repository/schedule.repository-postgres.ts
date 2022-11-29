import { Inject, Injectable } from '@nestjs/common';
import { ScheduleRepository } from './schedule.repository';
import { Database } from '../../../config/db-conn';
import { ScheduleDTO } from '../schedule-dto';

@Injectable()
export class ScheduleRepositoryPostgres implements ScheduleRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly database: Database,
  ) {}

  async create(params: ScheduleDTO): Promise<void> {
    const sql = {
      query: `INSERT INTO api_arv.schedules(
                idusers,
                idclients,
                client_name,
                description,
                time,
                date,
                pacote,
                atendence_count,
                total_atendence_count,
                status
            ) VALUES (
                $1, $2, $3, $4,$5, $6, $7, $8, $9, $10
            );`,
      values: [
        params.idusers,
        params.idclients,
        params.clientName,
        params.description,
        params.time,
        params.date,
        params.pacote,
        params.atendenceCount,
        params.totalAtendenceCount,
        params.status,
      ],
    };
    await this.database.query(sql.query, sql.values);
  }

  async update(params: ScheduleDTO): Promise<void> {
    const sql = {
      query: `UPDATE api_arv.schedules SET
                idusers = $1,
                idclients = $2,
                client_name = $3,
                description = $4,
                time = $5,
                date = $6,
                pacote = $7,
                atendence_count = $8,
                total_atendence_count = $9,
                status = $10
              WHERE idusers = $11 AND idschedules = $12;`,
      values: [
        params.idusers,
        params.idclients,
        params.clientName,
        params.description,
        params.time,
        params.date,
        params.pacote,
        params.atendenceCount,
        params.totalAtendenceCount,
        params.status,
        params.idusers,
        params.idschedules,
      ],
    };
    await this.database.query(sql.query, sql.values);
  }

  async findByTime(idusers: number, time: string): Promise<ScheduleDTO> {
    const sql = {
      query: `SELECT * FROM api_arv.schedules WHERE idusers = $1 AND time = $2  AND status = 'PENDING' ORDER BY s.idschedules;`,
      values: [idusers, time],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return rows[0];
  }

  async findByDate(idusers: number, date: string): Promise<ScheduleDTO[]> {
    const sql = {
      query: `SELECT
                s.idschedules,
                s.idclients,
                s.client_name,
                c.name,
                c.phone,
                s.description,
                s.time,
                s.date,
                s.pacote,
                s.atendence_count,
                s.total_atendence_count,
                s.status,
                s.created_at
              FROM api_arv.schedules s
              LEFT JOIN api_arv.clients c ON s.idclients = c.idclients
              WHERE s.idusers = $1 AND s.date = $2 AND status = 'PENDING'
              ORDER BY s.idschedules;`,
      values: [idusers, date],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
  }

  async findByClient(
    idusers: number,
    idclients: number,
  ): Promise<ScheduleDTO[]> {
    const sql = {
      query: `SELECT
                s.idschedules,
                s.idclients,
                s.client_name,
                c.name,
                c.phone,
                s.description,
                s.time,
                s.date,
                s.pacote,
                s.atendence_count,
                s.total_atendence_count,
                s.status,
                s.created_at
              FROM api_arv.schedules s
              LEFT JOIN api_arv.clients c ON s.idclients = c.idclients
              WHERE s.idusers = $1 AND s.idclients = $2 AND status = 'PENDING'
              ORDER BY s.idschedules;`,
      values: [idusers, idclients],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
  }

  async findAllExpireds(idusers: number): Promise<ScheduleDTO[]> {
    const sql = {
      query: `SELECT
                s.idschedules,
                s.idclients,
                s.client_name,
                c.name,
                c.phone,
                s.description,
                s.time,
                s.date,
                s.pacote,
                s.atendence_count,
                s.total_atendence_count,
                s.status,
                s.created_at
              FROM api_arv.schedules s
              LEFT JOIN api_arv.clients c ON s.idclients = c.idclients
              WHERE s.idusers = $1 AND current_date - s.date > 0 AND status = 'PENDING'`,
      values: [idusers],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
  }

  async delete(idusers: number, idschedules: number): Promise<void> {
    const sql = {
      query: `DELETE FROM api_arv.schedules WHERE idusers = $1 AND idschedules = $2`,
      values: [idusers, idschedules],
    };
    await this.database.query(sql.query, sql.values);
  }

  async findOne(idusers: number, idschedules: number): Promise<ScheduleDTO> {
    const sql = {
      query: `SELECT * FROM api_arv.schedules WHERE idusers = $1 AND idschedules = $2`,
      values: [idusers, idschedules],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return rows[0];
  }

  async finish(idusers: number, idschedules: number): Promise<void> {
    const sql = {
      query: `UPDATE api_arv.schedules SET status = 'FINISHED' WHERE idusers = $1 AND idschedules = $2`,
      values: [idusers, idschedules],
    };
    await this.database.query(sql.query, sql.values);
  }

  private normalizePayload(params: any[]): ScheduleDTO[] {
    return params.map((schedule) => {
      return {
        idschedules: schedule.idschedules,
        idclients: schedule.idclients,
        clientName: schedule.client_name,
        name: schedule.name,
        phone: schedule.phone,
        description: schedule.description,
        time: schedule.time,
        date: schedule.date,
        pacote: schedule.pacote,
        atendenceCount: schedule.atendence_count,
        totalAtendenceCount: schedule.total_atendence_count,
        status: schedule.status,
        createdAt: schedule.created_at,
      };
    });
  }
}
