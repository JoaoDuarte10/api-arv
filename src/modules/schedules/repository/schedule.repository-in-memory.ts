import { ScheduleDTO, ScheduleStatus } from '../schedule-dto';
import { ScheduleServicesEntityDB } from './schedule-services.entity';
import { ScheduleRepository } from './schedule.repository';

export class ScheduleRepositoryInMemory implements ScheduleRepository {
  schedules: ScheduleDTO[] = [];

  async create(params: ScheduleDTO): Promise<void> {
    params.idschedules = this.schedules.length + 1;
    this.schedules.push(params);
  }

  async update(params: ScheduleDTO): Promise<void> {
    const schedule = this.schedules.find(
      (schedule) =>
        schedule.idusers === params.idusers &&
        schedule.idschedules === params.idschedules,
    );
    this.schedules.splice(this.schedules.indexOf(schedule), 1);
    this.schedules.push(params);
  }

  async findByTimeAndDate(
    idusers: number,
    time: string,
    date: string,
  ): Promise<ScheduleDTO> {
    return this.schedules.find(
      (schedule) =>
        schedule.idusers === idusers &&
        schedule.time === time &&
        schedule.date === date,
    );
  }

  async findByDate(idusers: number, date: string): Promise<ScheduleDTO[]> {
    return this.schedules.filter(
      (schedule) => schedule.idusers === idusers && schedule.date === date,
    );
  }

  async findByIdClient(
    idusers: number,
    idclients: number,
  ): Promise<ScheduleDTO[]> {
    return this.schedules.filter(
      (schedule) =>
        schedule.idusers === idusers && schedule.idclients === idclients,
    );
  }

  async findByClientName(
    idusers: number,
    clientName: string,
  ): Promise<ScheduleDTO[]> {
    return this.schedules.filter(
      (schedule) =>
        schedule.idusers === idusers && schedule.clientName === clientName,
    );
  }

  async findAllExpireds(idusers: number): Promise<ScheduleDTO[]> {
    return this.schedules.filter((schedule) => {
      const currentDate = new Date();
      const scheduleExpired = new Date(schedule.date) < currentDate;
      return schedule.idusers === idusers && scheduleExpired;
    });
  }

  async delete(idusers: number, idschedules: number): Promise<void> {
    const schedule = this.schedules.find(
      (schedule) =>
        schedule.idusers === idusers && schedule.idschedules === idschedules,
    );
    this.schedules.splice(this.schedules.indexOf(schedule), 1);
  }

  async findOne(idusers: number, idschedules: number): Promise<ScheduleDTO> {
    return this.schedules.find(
      (schedule) =>
        schedule.idusers === idusers && schedule.idschedules === idschedules,
    );
  }

  async finish(idusers: number, idschedules: number): Promise<void> {
    const schedule = this.schedules.find(
      (schedule) =>
        schedule.idusers === idusers && schedule.idschedules === idschedules,
    );
    schedule.status = ScheduleStatus.FINISHED;
  }

  async getAllFinished(idusers: number): Promise<ScheduleDTO[]> {
    return this.schedules.filter(
      (schedule) =>
        schedule.idusers === idusers &&
        schedule.status === ScheduleStatus.FINISHED,
    );
  }

  async getMostRecentFrom(
    idusers: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _fromDate: string,
  ): Promise<ScheduleDTO[]> {
    return this.schedules.filter(
      (schedule) =>
        schedule.idusers === idusers &&
        schedule.status === ScheduleStatus.FINISHED,
    );
  }

  async createScheduleServices(
    idschedule: number,
    idcatalogs: number,
  ): Promise<void> {
    console.log(idschedule, idcatalogs);
  }

  async updateScheduleServices(
    idschedule: number,
    idcatalogs: number[],
  ): Promise<void> {
    console.log(idschedule, idcatalogs);
  }

  async deleteScheduleServices(idschedules: number): Promise<void> {
    console.log(idschedules);
  }

  async getScheduleServicesByIdSchedule(
    idSchedule: number,
  ): Promise<ScheduleServicesEntityDB[]> {
    console.log(idSchedule);
    return [];
  }
}
