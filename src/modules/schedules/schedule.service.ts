import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from './repository/schedule.repository';
import { ScheduleDTO } from './schedule-dto';
import { ScheduleEntity } from './domain/schedule.entity';
import { InvalidParamsRequestException } from '../../exceptions/invalid-params-request';
import { InvalidScheduleException } from './domain/exceptions/invalid-schedule';

@Injectable()
export class ScheduleService {
  constructor(private readonly repository: ScheduleRepository) {}

  async create(params: ScheduleDTO): Promise<void> {
    const schedule = ScheduleEntity.create(params);
    if (schedule instanceof InvalidScheduleException) {
      throw new InvalidParamsRequestException(
        schedule.getMessage(),
        schedule.getDetails(),
      );
    }
    await this.repository.create(schedule.getProps());
  }
}
