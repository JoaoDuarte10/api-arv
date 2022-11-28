import { ScheduleDTO } from '../schedule-dto';
import { ScheduleRepository } from './schedule.repository';

export class ScheduleRepositoryInMemory implements ScheduleRepository {
  schedules: ScheduleDTO[] = [];

  async create(params: ScheduleDTO): Promise<void> {
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
}
