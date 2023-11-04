import { ScheduleDTO } from '../schedule-dto';
import { ScheduleServicesEntityDB } from './schedule-services.entity';

export abstract class ScheduleRepository {
  abstract create(params: ScheduleDTO): Promise<void>;
  abstract update(params: ScheduleDTO): Promise<void>;
  abstract createScheduleServices(
    idschedule: number,
    idcatalogs: number,
  ): Promise<void>;
  abstract updateScheduleServices(
    idschedule: number,
    idcatalogs: number[],
  ): Promise<void>;
  abstract deleteScheduleServices(idschedules: number): Promise<void>;
  abstract findByTimeAndDate(
    idusers: number,
    time: string,
    date: string,
  ): Promise<ScheduleDTO>;
  abstract findByDate(idusers: number, date: string): Promise<ScheduleDTO[]>;
  abstract findByIdClient(
    idusers: number,
    idclients: number,
  ): Promise<ScheduleDTO[]>;
  abstract findByClientName(
    idusers: number,
    clientName: string,
  ): Promise<ScheduleDTO[]>;
  abstract findAllExpireds(idusers: number): Promise<ScheduleDTO[]>;
  abstract delete(idusers: number, idschedules: number): Promise<void>;
  abstract findOne(idusers: number, idschedules: number): Promise<ScheduleDTO>;
  abstract finish(idusers: number, idschedules: number): Promise<void>;
  abstract getAllFinished(idusers: number): Promise<ScheduleDTO[]>;
  abstract getMostRecentFrom(
    idusers: number,
    fromDate: string,
  ): Promise<ScheduleDTO[]>;
  abstract getScheduleServicesByIdSchedule(
    idSchedule: number,
  ): Promise<ScheduleServicesEntityDB[]>;
}
