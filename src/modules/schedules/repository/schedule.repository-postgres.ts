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

  async findByTime(idusers: number, time: string): Promise<ScheduleDTO> {
    const sql = {
      query: 'SELECT * FROM api_arv.schedules WHERE idusers = $1 AND time = $2',
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
              WHERE s.idusers = $1 AND s.date = $2`,
      values: [idusers, date],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return rows.map((schedule) => {
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
