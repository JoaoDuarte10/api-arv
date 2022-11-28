import { ScheduleDTO } from '../schedule-dto';

export abstract class ScheduleRepository {
  abstract create(params: ScheduleDTO): Promise<void>;
  abstract findByTime(idusers: number, time: string): Promise<ScheduleDTO>;
  abstract findByDate(idusers: number, date: string): Promise<ScheduleDTO[]>;
  abstract findByClient(
    idusers: number,
    idclients: number,
  ): Promise<ScheduleDTO[]>;
}
