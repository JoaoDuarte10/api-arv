import { Inject, Injectable } from '@nestjs/common';
import { ScheduleRepository } from './schedule.repository';
import { Database } from '../../../config/db-conn';
import { ScheduleDTO, ScheduleStatus } from '../schedule-dto';
import { ScheduleEntityDB } from './schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleServicesEntityDB } from './schedule-services.entity';

@Injectable()
export class ScheduleRepositoryPostgres implements ScheduleRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly database: Database,
    @InjectRepository(ScheduleEntityDB)
    private scheduleRepository: Repository<ScheduleEntityDB>,
    @InjectRepository(ScheduleServicesEntityDB)
    private scheduleServicesRepository: Repository<ScheduleServicesEntityDB>,
  ) {}

  async create(params: ScheduleDTO): Promise<void> {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    const scheduleEntity = new ScheduleEntityDB();
    scheduleEntity.idUsers = params.idusers;
    scheduleEntity.idClients = params.idclients;
    scheduleEntity.clientName = params.clientName;
    scheduleEntity.description = params.description;
    scheduleEntity.time = params.time;
    scheduleEntity.date = params.date;
    scheduleEntity.pacote = params.pacote;
    scheduleEntity.atendenceCount = params.totalAtendenceCount;
    scheduleEntity.totalAtendenceCount = params.totalAtendenceCount;
    scheduleEntity.status = params.status;
    scheduleEntity.createdAt = date;

    await this.scheduleRepository.save(scheduleEntity);
  }

  async createScheduleServices(
    idschedule: number,
    idcatalogs: number,
  ): Promise<void> {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    const scheduleService = new ScheduleServicesEntityDB();
    scheduleService.idCatalog = idcatalogs;
    scheduleService.idSchedules = idschedule;
    scheduleService.createdAt = date;

    await this.scheduleServicesRepository.save(scheduleService);
  }

  async deleteScheduleServices(idschedules: number): Promise<void> {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    const sql = {
      query: `DELETE FROM api_arv.schedule_services ss WHERE idschedules = $1`,
      values: [idschedules],
    };

    await this.database.query(sql.query, sql.values);
  }

  async updateScheduleServices(
    idScheduleService: number,
    idcatalogs: number[],
  ): Promise<void> {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    const sql = {
      query: `UPDATE api_arv.schedules SET
                idcatalog = $1,
                updated_at = $2
              WHERE idschedule_services = $3`,
      values: [idScheduleService, idcatalogs, date],
    };

    await this.database.query(sql.query, sql.values);
  }

  async update(params: ScheduleDTO): Promise<void> {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

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
        date,
        params.idusers,
        params.idschedules,
      ],
    };
    await this.database.query(sql.query, sql.values);
  }

  async findByTimeAndDate(
    idusers: number,
    time: string,
    date: string,
  ): Promise<ScheduleDTO> {
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
              WHERE s.idusers = $1 AND s.time = $2 AND s.date = $3 AND s.status = $4
              ORDER BY s.idschedules;`,
      values: [idusers, time, date, ScheduleStatus.PENDING],
    };
    const { rows } = await this.database.query(sql.query, sql.values);

    if (!rows.length) {
      return;
    }

    const sqlScheduleService = {
      query: `
            SELECT
              c.name,
              ss.idcatalog,
              ss.idschedule_services,
              ss.idschedules
            FROM api_arv.schedule_services ss
            INNER JOIN api_arv.catalogs c ON ss.idcatalog = c.idcatalog
            WHERE ss.idschedules IN (${rows.map((row) => row.idschedules)})`,
      values: [],
    };

    const { rows: scheduleServices } = await this.database.query(
      sqlScheduleService.query,
      sqlScheduleService.values,
    );

    return this.normalizePayload(rows, scheduleServices)[0];
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

    if (!rows.length) {
      return;
    }

    const sqlScheduleService = {
      query: `
            SELECT
              c.name,
              ss.idcatalog,
              ss.idschedule_services,
              ss.idschedules
            FROM api_arv.schedule_services ss
            INNER JOIN api_arv.catalogs c ON ss.idcatalog = c.idcatalog
            WHERE ss.idschedules IN (${rows.map((row) => row.idschedules)})`,
      values: [],
    };

    const { rows: scheduleServices } = await this.database.query(
      sqlScheduleService.query,
      sqlScheduleService.values,
    );

    return this.normalizePayload(rows, scheduleServices);
  }

  async findByIdClient(
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

    if (!rows.length) {
      return;
    }

    const sqlScheduleService = {
      query: `
            SELECT
              c.name,
              ss.idcatalog,
              ss.idschedule_services,
              ss.idschedules
            FROM api_arv.schedule_services ss
            INNER JOIN api_arv.catalogs c ON ss.idcatalog = c.idcatalog
            WHERE ss.idschedules IN (${rows.map((row) => row.idschedules)})`,
      values: [],
    };

    const { rows: scheduleServices } = await this.database.query(
      sqlScheduleService.query,
      sqlScheduleService.values,
    );

    return this.normalizePayload(rows, scheduleServices);
  }

  async findByClientName(
    idusers: number,
    clientName: string,
  ): Promise<ScheduleDTO[]> {
    const sql = {
      query: `SELECT
                s.idschedules,
                s.idclients,
                s.client_name,
                s.description,
                s.time,
                s.date,
                s.pacote,
                s.atendence_count,
                s.total_atendence_count,
                s.status,
                s.created_at
              FROM api_arv.schedules s
              WHERE s.idusers = $1 AND s.client_name = $2 AND status = $3
              ORDER BY s.date, s.time;`,
      values: [idusers, clientName, ScheduleStatus.PENDING],
    };
    const { rows } = await this.database.query(sql.query, sql.values);

    if (!rows.length) {
      return;
    }

    const sqlScheduleService = {
      query: `
            SELECT
              c.name,
              ss.idschedule_services
            FROM api_arv.schedule_services ss
            INNER JOIN api_arv.catalogs c ON ss.idcatalog = c.idcatalog
            WHERE ss.idschedules IN ($1)`,
      values: [...rows.map((row) => row.idschedules)],
    };

    const { rows: scheduleServices } = await this.database.query(
      sqlScheduleService.query,
      sqlScheduleService.values,
    );

    return this.normalizePayload(rows, scheduleServices);
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

    if (!rows.length) {
      return;
    }

    const sqlScheduleService = {
      query: `
            SELECT
              c.name,
              ss.idcatalog,
              ss.idschedule_services,
              ss.idschedules
            FROM api_arv.schedule_services ss
            INNER JOIN api_arv.catalogs c ON ss.idcatalog = c.idcatalog
            WHERE ss.idschedules IN (${rows.map((row) => row.idschedules)})`,
      values: [],
    };

    const { rows: scheduleServices } = await this.database.query(
      sqlScheduleService.query,
      sqlScheduleService.values,
    );

    const schedules = this.normalizePayload(rows, scheduleServices);

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
    const sqlScheduleService = {
      query: `
            SELECT
              c.name,
              ss.idschedule_services
            FROM api_arv.schedule_services ss
            INNER JOIN api_arv.catalogs c ON ss.idcatalog = c.idcatalog
            WHERE ss.idschedules IN ($1)`,
      values: [...rows.map((row) => row.idschedules)],
    };

    const { rows: scheduleServices } = await this.database.query(
      sqlScheduleService.query,
      sqlScheduleService.values,
    );

    return this.normalizePayload(rows, scheduleServices)[0];
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
    const sqlScheduleService = {
      query: `
            SELECT
              c.name,
              ss.idschedule_services
            FROM api_arv.schedule_services ss
            INNER JOIN api_arv.catalogs c ON ss.idcatalog = c.idcatalog
            WHERE ss.idschedules IN ($1)`,
      values: [...rows.map((row) => row.idschedules)],
    };

    const { rows: scheduleServices } = await this.database.query(
      sqlScheduleService.query,
      sqlScheduleService.values,
    );

    return this.normalizePayload(rows, scheduleServices);
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
    const sqlScheduleService = {
      query: `
            SELECT
              c.name,
              ss.idschedule_services
            FROM api_arv.schedule_services ss
            INNER JOIN api_arv.catalogs c ON ss.idcatalog = c.idcatalog
            WHERE ss.idschedules IN ($1)`,
      values: [...rows.map((row) => row.idschedules)],
    };

    const { rows: scheduleServices } = await this.database.query(
      sqlScheduleService.query,
      sqlScheduleService.values,
    );

    return this.normalizePayload(rows, scheduleServices);
  }

  async getScheduleServicesByIdSchedule(
    idSchedule: number,
  ): Promise<ScheduleServicesEntityDB[]> {
    const sql = {
      query: `SELECT * FROM api_arv.schedule_services ss WHERE idschedules = $1`,
      values: [idSchedule],
    };

    const { rows } = await this.database.query(sql.query, sql.values);

    return rows?.map((row) => ({
      idScheduleServices: row.idschedule_services,
      idSchedules: row.idschedules,
      idCatalog: row.idcatalog,
      createdAt: row.created_at,
      updatedAt: row.updatet_at,
    }));
  }

  private normalizePayload(
    params: any[],
    scheduleServices?: any[],
  ): ScheduleDTO[] {
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
        scheduleServices: scheduleServices
          ?.map((scheduleService) => {
            if (scheduleService.idschedules !== schedule.idschedules) {
              return;
            }

            return {
              name: scheduleService.name,
              idScheduleServices: scheduleService.idschedule_services,
              idCatalog: scheduleService.idcatalog,
            };
          })
          .filter((item) => !!item),
        createdAt: schedule.created_at,
        updatedAt: schedule.updated_at,
      };
    });
  }
}
