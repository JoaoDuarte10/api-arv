import { Module } from '@nestjs/common';
import { clientController } from './controller/index';
import { clientService } from './services/index';
import { configProviders } from '../../providers/config-provider';
import { dependenciesProviders } from '../../providers/dependencies-provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/config/database-entities';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...clientController],
  providers: [...clientService, ...configProviders, ...dependenciesProviders],
})
export class ClientModule {}
