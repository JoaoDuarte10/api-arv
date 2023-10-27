import { OutgoingController } from './outgoing.controller';
import { OutgoingService } from './outgoing.service';
import { configProviders } from '../../providers/config-provider';
import { dependenciesProviders } from '../../providers/dependencies-provider';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/config/database-entities';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [OutgoingController],
  providers: [OutgoingService, ...configProviders, ...dependenciesProviders],
})
export class OutgoingModule {}
