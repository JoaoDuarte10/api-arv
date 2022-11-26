import { Module } from '@nestjs/common';
import { RulesController } from './controllers/rules.controller';
import { RulesService } from './rules.service';
import { RulesRepository } from './rules.repository';
import { configProviders } from '../../providers/config-provider';

@Module({
  controllers: [RulesController],
  providers: [RulesService, RulesRepository, ...configProviders],
})
export class RulesModule {}
