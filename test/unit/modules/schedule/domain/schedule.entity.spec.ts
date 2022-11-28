import {
  ScheduleDTO,
  ScheduleStatus,
} from '../../../../../src/modules/schedules/schedule-dto';
import { ScheduleEntity } from '../../../../../src/modules/schedules/domain/schedule.entity';
import { InvalidScheduleException } from '../../../../../src/modules/schedules/domain/exceptions/invalid-schedule';

describe('ScheduleEntity', () => {
  let payload: ScheduleDTO;

  beforeEach(() => {
    payload = {
      idusers: 1,
      idclients: 1,
      clientName: null,
      description: 'any_description',
      time: new Date().getTime().toString(),
      date: new Date().toISOString(),
      pacote: false,
      atendenceCount: 0,
      totalAtendenceCount: 0,
      status: ScheduleStatus.PENDING,
    };
  });

  it('Should create new schedule', () => {
    const entity = ScheduleEntity.create(payload);
    expect(entity).toBeDefined();
  });

  it('Should return error when idusers is not provided', () => {
    delete payload.idusers;
    const entity = ScheduleEntity.create(payload);
    expect(entity).toBeInstanceOf(InvalidScheduleException);
  });

  it('Should return error when idclients is not provided', () => {
    delete payload.idclients;
    const entity = ScheduleEntity.create(payload);
    expect(entity).toBeInstanceOf(InvalidScheduleException);
  });

  it('Should return error when description is not provided', () => {
    delete payload.description;
    const entity = ScheduleEntity.create(payload);
    expect(entity).toBeInstanceOf(InvalidScheduleException);
  });

  it('Should return error when time is not provided', () => {
    delete payload.time;
    const entity = ScheduleEntity.create(payload);
    expect(entity).toBeInstanceOf(InvalidScheduleException);
  });

  it('Should return error when date is not provided', () => {
    delete payload.date;
    const entity = ScheduleEntity.create(payload);
    expect(entity).toBeInstanceOf(InvalidScheduleException);
  });

  it('Should return error when pacote is not provided', () => {
    delete payload.pacote;
    const entity = ScheduleEntity.create(payload);
    expect(entity).toBeInstanceOf(InvalidScheduleException);
  });

  it('Should return error when status is not provided', () => {
    delete payload.description;
    const entity = ScheduleEntity.create(payload);
    expect(entity).toBeInstanceOf(InvalidScheduleException);
  });

  it('Should return error when status is invalid', () => {
    payload.status = 'any_status' as any;
    const entity = ScheduleEntity.create(payload);
    expect(entity).toBeInstanceOf(InvalidScheduleException);
  });

  it('Should return error when status is FINISHED', () => {
    payload.status = ScheduleStatus.FINISHED;
    const entity = ScheduleEntity.create(payload);
    expect(entity).toBeInstanceOf(InvalidScheduleException);
  });

  it('Should return status code 400 when pacote is true and totalAtendenceCount to equal 0', async () => {
    payload.pacote = true;
    payload.totalAtendenceCount = 0;
    const entity = ScheduleEntity.create(payload);
    expect(entity).toBeInstanceOf(InvalidScheduleException);
  });
});
