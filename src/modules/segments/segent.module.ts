import { Module } from '@nestjs/common';
import { SegmentController } from './rules.controller';
import { SegmentService } from './segment.service';
import { SegmentRepository } from './segment.repository';
import { ClientModule } from '../clients/client.module';
import { configProviders } from '../../providers/config-provider';

@Module({
  imports: [ClientModule],
  controllers: [SegmentController],
  providers: [SegmentService, SegmentRepository, ...configProviders],
})
export class SegmentModule {}
