import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { configProviders } from '../../providers/config-provider';
import { dependenciesProviders } from '../../providers/dependencies-provider';

@Module({
  controllers: [SalesController],
  providers: [SalesService, ...configProviders, ...dependenciesProviders],
})
export class SalesModule {}
