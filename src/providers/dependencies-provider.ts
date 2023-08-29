import { Provider } from '@nestjs/common';
import { ClientRepository } from '../modules/clients/repository/client';
import { ScheduleRepository } from '../modules/schedules/repository/schedule.repository';
import { ScheduleRepositoryPostgres } from '../modules/schedules/repository/schedule.repository-postgres';
import { ClientRepositoryPostgres } from '../modules/clients/repository/client.repository-postgres';
import { RulesRepository } from '../modules/rules/repository/rules.repository';
import { RulesRepositoryPostgres } from '../modules/rules/repository/rules.repository-postgres';
import { SalesRepository } from '../modules/sales/repository/sales-repository';
import { SalesRepositoryPostgres } from '../modules/sales/repository/sales.repository-postgres';
import { OutgoingRepository } from '../modules/outgoing/repository/outgoing.repository';
import { OutgoingRepositoryPostgres } from '../modules/outgoing/repository/outgoing.repository-postgres';
import { CatalogRepository } from 'src/modules/catalog/repository/catalog.repository';
import { CatalogRepositoryPostgres } from 'src/modules/catalog/repository/catalog.repository-postgres';

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
  {
    provide: SalesRepository,
    useClass: SalesRepositoryPostgres,
  },
  {
    provide: OutgoingRepository,
    useClass: OutgoingRepositoryPostgres,
  },
  {
    provide: CatalogRepository,
    useClass: CatalogRepositoryPostgres,
  },
];
