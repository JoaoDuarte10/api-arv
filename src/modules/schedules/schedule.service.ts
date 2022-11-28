import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from './repository/schedule.repository';
import { ScheduleDTO } from './schedule-dto';
import { ScheduleEntity } from './domain/schedule.entity';
import { InvalidParamsRequestException } from '../../exceptions/invalid-params-request';
import { InvalidScheduleException } from './domain/exceptions/invalid-schedule';
import { ScheduleAlreadyExistsException } from './exceptions/schedule-already-exists';

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
    const scheduleAlreadyExists = await this.repository.findByTime(
      params.idusers,
      schedule.getTime(),
    );

    if (scheduleAlreadyExists) {
      throw new ScheduleAlreadyExistsException(
        'Schedule already exists in this time',
      );
    }

    await this.repository.create(schedule.getProps());
  }

  async findByDate(idusers: number, date: string): Promise<ScheduleDTO[]> {
    return await this.repository.findByDate(idusers, date);
  }
}
