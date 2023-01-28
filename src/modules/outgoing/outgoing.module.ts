import { OutgoingController } from './outgoing.controller';
import { OutgoingService } from './outgoing.service';
import { configProviders } from '../../providers/config-provider';
import { dependenciesProviders } from '../../providers/dependencies-provider';
import { Module } from '@nestjs/common';

@Module({
  controllers: [OutgoingController],
  providers: [OutgoingService, ...configProviders, ...dependenciesProviders],
})
export class OutgoingModule {}
