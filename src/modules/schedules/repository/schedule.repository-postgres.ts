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
}
