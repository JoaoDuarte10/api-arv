import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from './repository/schedule.repository';
import { ScheduleDTO } from './schedule-dto';
import { ScheduleEntity } from './domain/schedule.entity';
import { InvalidParamsRequestException } from '../../exceptions/invalid-params-request';
import { InvalidScheduleException } from './domain/exceptions/invalid-schedule';
import { ScheduleAlreadyExistsException } from './exceptions/schedule-already-exists';
import { ScheduleNotExistsException } from './exceptions/schedule-not-exists';
import { ScheduleAlreadyFinishedException } from './exceptions/schedule-already-finished';

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
    const scheduleAlreadyExists = await this.repository.findByTimeAndDate(
      params.idusers,
      schedule.getTime(),
      schedule.getDate(),
    );

    if (scheduleAlreadyExists) {
      throw new ScheduleAlreadyExistsException(
        'Schedule already exists in this time',
      );
    }

    await this.repository.create(schedule.getProps());

    const newSchedule = await this.repository.findByTimeAndDate(
      schedule.getProps().idusers,
      schedule.getProps().time,
      schedule.getProps().date,
    );

    if (
      !schedule.getProps().idCatalogs ||
      !schedule.getProps().idCatalogs.length
    ) {
      return;
    }

    await Promise.all(
      schedule.getProps().idCatalogs.map(async (idcatalog) => {
        await this.repository.createScheduleServices(
          newSchedule.idschedules,
          idcatalog,
        );
      }),
    );
  }

  async update(params: ScheduleDTO): Promise<void> {
    const schedule = ScheduleEntity.create(params);
    if (schedule instanceof InvalidScheduleException) {
      throw new InvalidParamsRequestException(
        schedule.getMessage(),
        schedule.getDetails(),
      );
    }
    const scheduleExists = await this.repository.findOne(
      params.idusers,
      params.idschedules,
    );

    if (!scheduleExists) {
      throw new ScheduleNotExistsException('Schedule not exists');
    }

    await this.repository.update(params);

    if (
      !schedule.getProps().idCatalogs ||
      !schedule.getProps().idCatalogs.length
    ) {
      await this.repository.deleteScheduleServices(
        schedule.getProps().idschedules,
      );
      return;
    }

    await this.repository.deleteScheduleServices(
      schedule.getProps().idschedules,
    );

    await Promise.all(
      schedule.getProps().idCatalogs.map(async (idcatalog) => {
        await this.repository.createScheduleServices(
          schedule.getProps().idschedules,
          idcatalog,
        );
      }),
    );
  }

  async findByDate(idusers: number, date: string): Promise<ScheduleDTO[]> {
    return await this.repository.findByDate(idusers, date);
  }

  async findByIdClient(
    idusers: number,
    idclients: number,
  ): Promise<ScheduleDTO[]> {
    return await this.repository.findByIdClient(idusers, idclients);
  }

  async findByClientName(
    idusers: number,
    clientName: string,
  ): Promise<ScheduleDTO[]> {
    return await this.repository.findByClientName(idusers, clientName);
  }

  async findAllExpireds(idusers: number): Promise<ScheduleDTO[]> {
    return await this.repository.findAllExpireds(idusers);
  }

  async findById(idusers: number, idschedules: number): Promise<ScheduleDTO> {
    return await this.repository.findOne(idusers, idschedules);
  }

  async delete(idusers: number, idschedules: number): Promise<void> {
    const scheduleExists = await this.repository.findOne(idusers, idschedules);
    if (!scheduleExists) {
      throw new ScheduleNotExistsException(
        `Schedule with id ${idschedules} not exists`,
      );
    }
    await this.repository.delete(idusers, idschedules);
  }

  async finish(idusers: number, idschedules: number): Promise<void> {
    const scheduleExists = await this.repository.findOne(idusers, idschedules);
    if (!scheduleExists) {
      throw new ScheduleNotExistsException(
        `Schedule with id ${idschedules} not exists`,
      );
    }

    scheduleExists.idusers = idusers;

    const schedule = ScheduleEntity.create(scheduleExists);

    if (schedule instanceof ScheduleEntity) {
      schedule.finish();
      await this.repository.update(schedule.getProps());
    } else {
      throw new ScheduleAlreadyFinishedException(
        'Essa agenda já foi finalizada!',
      );
    }
  }

  async getAllFinished(idusers: number): Promise<ScheduleDTO[]> {
    return await this.repository.getAllFinished(idusers);
  }

  async getMostRecentFrom(
    idusers: number,
    fromDate: string,
  ): Promise<ScheduleDTO[]> {
    return await this.repository.getMostRecentFrom(idusers, fromDate);
  }
}
