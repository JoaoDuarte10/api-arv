import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { dependenciesProviders } from 'src/providers/dependencies-provider';
import { configProviders } from 'src/providers/config-provider';

@Module({
  controllers: [CatalogController],
  providers: [CatalogService, ...configProviders, ...dependenciesProviders],
})
export class CatalogModule {}
