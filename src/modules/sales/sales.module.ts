import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { configProviders } from '../../providers/config-provider';
import { dependenciesProviders } from '../../providers/dependencies-provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/config/database-entities';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [SalesController],
  providers: [SalesService, ...configProviders, ...dependenciesProviders],
})
export class SalesModule {}
