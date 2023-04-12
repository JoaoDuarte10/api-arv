import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { configProviders } from '../../providers/config-provider';
import { dependenciesProviders } from '../../providers/dependencies-provider';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, ...configProviders, ...dependenciesProviders],
})
export class ScheduleModule {}
