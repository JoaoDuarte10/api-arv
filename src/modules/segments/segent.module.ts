import { Module } from '@nestjs/common';
import { SegmentController } from './segments.controller';
import { SegmentService } from './segment.service';
import { SegmentRepository } from './segment.repository';
import { configProviders } from '../../providers/config-provider';
import { dependenciesProviders } from '../../providers/dependencies-provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/config/database-entities';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [SegmentController],
  providers: [
    SegmentService,
    SegmentRepository,
    ...configProviders,
    ...dependenciesProviders,
  ],
})
export class SegmentModule {}
