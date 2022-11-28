import { Provider } from '@nestjs/common';
import { ScheduleRepository } from '../modules/schedules/repository/schedule.repository';
import { ScheduleRepositoryPostgres } from '../modules/schedules/repository/schedule.repository-postgres';

export const dependenciesProviders: Provider[] = [
  {
    provide: ScheduleRepository,
    useClass: ScheduleRepositoryPostgres,
  },
];
