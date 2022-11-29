import { ScheduleDTO } from '../schedule-dto';
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

  async findByTime(idusers: number, time: string): Promise<ScheduleDTO> {
    return this.schedules.find(
      (schedule) => schedule.idusers === idusers && schedule.time === time,
    );
  }

  async findByDate(idusers: number, date: string): Promise<ScheduleDTO[]> {
    return this.schedules.filter(
      (schedule) => schedule.idusers === idusers && schedule.date === date,
    );
  }

  async findByClient(
    idusers: number,
    idclients: number,
  ): Promise<ScheduleDTO[]> {
    return this.schedules.filter(
      (schedule) =>
        schedule.idusers === idusers && schedule.idclients === idclients,
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
}
