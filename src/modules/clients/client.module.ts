import { Module } from '@nestjs/common';
import { clientController } from './controller/index';
import { clientService } from './services/index';
import { configProviders } from '../../providers/config-provider';
import { dependenciesProviders } from '../../providers/dependencies-provider';

@Module({
  controllers: [...clientController],
  providers: [...clientService, ...configProviders, ...dependenciesProviders],
})
export class ClientModule {}
