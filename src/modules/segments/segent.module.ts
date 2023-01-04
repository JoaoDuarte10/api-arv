import { Module } from '@nestjs/common';
import { SegmentController } from './segments.controller';
import { SegmentService } from './segment.service';
import { SegmentRepository } from './segment.repository';
import { configProviders } from '../../providers/config-provider';
import { dependenciesProviders } from '../../providers/dependencies-provider';

@Module({
  controllers: [SegmentController],
  providers: [
    SegmentService,
    SegmentRepository,
    ...configProviders,
    ...dependenciesProviders,
  ],
})
export class SegmentModule {}
