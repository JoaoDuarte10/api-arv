import { Inject, Injectable } from '@nestjs/common';
import { ScheduleRepository } from './schedule.repository';
import { Database } from '../../../config/db-conn';
import { ScheduleDTO, ScheduleStatus } from '../schedule-dto';

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
                status = $10,
                updated_at = $11
              WHERE idusers = $12 AND idschedules = $13;`,
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
        new Date(),
        params.idusers,
        params.idschedules,
      ],
    };
    await this.database.query(sql.query, sql.values);
  }

  async findByTime(idusers: number, time: string): Promise<ScheduleDTO> {
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
              WHERE s.idusers = $1 AND s.time = $2  AND s.status = $3
              ORDER BY s.idschedules;`,
      values: [idusers, time, ScheduleStatus.PENDING],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows)[0];
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
              WHERE s.idusers = $1 AND s.date = $2 AND status = $3
              ORDER BY s.time;`,
      values: [idusers, date, ScheduleStatus.PENDING],
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
              WHERE s.idusers = $1 AND s.idclients = $2 AND status = $3
              ORDER BY s.date, s.time;`,
      values: [idusers, idclients, ScheduleStatus.PENDING],
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
              WHERE s.idusers = $1 AND current_date - s.date > 0 AND status = $2
              ORDER BY s.idschedules;`,
      values: [idusers, ScheduleStatus.PENDING],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    const schedules = this.normalizePayload(rows);
    return schedules.map((schedule) => {
      schedule['expired'] = true;
      return schedule;
    });
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
              WHERE s.idusers = $1 AND s.idschedules = $2
              ORDER BY s.date, s.time`,
      values: [idusers, idschedules],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows)[0];
  }

  async finish(idusers: number, idschedules: number): Promise<void> {
    const sql = {
      query: `UPDATE api_arv.schedules SET status = $1, updated_at = $2 WHERE idusers = $3 AND idschedules = $4`,
      values: [ScheduleStatus.FINISHED, new Date(), idusers, idschedules],
    };
    await this.database.query(sql.query, sql.values);
  }

  async getAllFinished(idusers: number): Promise<ScheduleDTO[]> {
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
                s.created_at,
                s.updated_at
              FROM api_arv.schedules s
              LEFT JOIN api_arv.clients c ON s.idclients = c.idclients
              WHERE s.idusers = $1 AND s.status = $2
              ORDER BY s.updated_at`,
      values: [idusers, ScheduleStatus.FINISHED],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
  }

  async getMostRecentFrom(
    idusers: number,
    fromDate: string,
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
                s.created_at,
                s.updated_at
              FROM api_arv.schedules s
              LEFT JOIN api_arv.clients c ON s.idclients = c.idclients
              WHERE s.idusers = $1 AND s.status = $2 AND s.updated_at >= $3
              ORDER BY s.updated_at DESC;`,
      values: [idusers, ScheduleStatus.FINISHED, fromDate],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return this.normalizePayload(rows);
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
        time: schedule.time.substring(0, 5),
        date: schedule.date,
        pacote: schedule.pacote,
        atendenceCount: schedule.atendence_count,
        totalAtendenceCount: schedule.total_atendence_count,
        status: schedule.status,
        createdAt: schedule.created_at,
        updatedAt: schedule.updated_at,
      };
    });
  }
}
