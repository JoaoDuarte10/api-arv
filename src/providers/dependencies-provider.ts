import { Provider } from '@nestjs/common';
import { ClientRepository } from 'src/modules/clients/repository/client';
import { ScheduleRepository } from '../modules/schedules/repository/schedule.repository';
import { ScheduleRepositoryPostgres } from '../modules/schedules/repository/schedule.repository-postgres';
import { ClientRepositoryPostgres } from '../modules/clients/repository/client.repository-postgres';
import { RulesRepository } from '../modules/rules/repository/rules.repository';
import { RulesRepositoryPostgres } from '../modules/rules/repository/rules.repository-postgres';

export const dependenciesProviders: Provider[] = [
  {
    provide: ScheduleRepository,
    useClass: ScheduleRepositoryPostgres,
  },
  {
    provide: ClientRepository,
    useClass: ClientRepositoryPostgres,
  },
  {
    provide: RulesRepository,
    useClass: RulesRepositoryPostgres,
  },
];
