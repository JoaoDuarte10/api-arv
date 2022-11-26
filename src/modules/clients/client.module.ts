import { Module } from '@nestjs/common';
import { clientController } from './controller/index';
import { clientService } from './services/index';
import { ClientRepository } from './repository/client';
import { configProviders } from 'src/providers/config-provider';

@Module({
  controllers: [...clientController],
  providers: [...clientService, ClientRepository, ...configProviders],
  exports: [ClientRepository],
})
export class ClientModule {}
