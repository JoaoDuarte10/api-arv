import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { SalesRepository } from './sales.repository';
import { configProviders } from 'src/providers/config-provider';

@Module({
  controllers: [SalesController],
  providers: [SalesService, SalesRepository, ...configProviders],
})
export class SalesModule {}
