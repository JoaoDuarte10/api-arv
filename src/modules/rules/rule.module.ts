import { Module } from '@nestjs/common';
import { RulesController } from './controllers/rules.controller';
import { RulesService } from './rules.service';
import { configProviders } from '../../providers/config-provider';
import { dependenciesProviders } from '../../providers/dependencies-provider';

@Module({
  controllers: [RulesController],
  providers: [RulesService, ...configProviders, ...dependenciesProviders],
})
export class RulesModule {}
