import { ScheduleDTO } from '../schedule-dto';

export abstract class ScheduleRepository {
  abstract create(params: ScheduleDTO): Promise<void>;
}
