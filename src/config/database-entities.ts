import { CatalogsEntityDB } from 'src/modules/catalog/repository/catalog.entity';
import { ScheduleServicesEntityDB } from 'src/modules/schedules/repository/schedule-services.entity';
import { ScheduleEntityDB } from 'src/modules/schedules/repository/schedule.entity';

export const entities = [
  ScheduleEntityDB,
  ScheduleServicesEntityDB,
  CatalogsEntityDB,
];
