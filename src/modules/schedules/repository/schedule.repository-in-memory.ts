import { ScheduleDTO } from '../schedule-dto';
import { ScheduleRepository } from './schedule.repository';

export class ScheduleRepositoryInMemory implements ScheduleRepository {
  schedules: ScheduleDTO[] = [];

  async create(params: ScheduleDTO): Promise<void> {
    this.schedules.push(params);
  }
}
