import { ScheduleController } from '../../../../src/modules/schedules/schedule.controller';
import { ScheduleService } from '../../../../src/modules/schedules/schedule.service';
import { ScheduleRepositoryInMemory } from '../../../../src/modules/schedules/repository/schedule.repository-in-memory';
import {
  ScheduleDTO,
  ScheduleStatus,
} from '../../../../src/modules/schedules/schedule-dto';

describe('ScheduleIntegration', () => {
  let sut: ScheduleController;
  let service: ScheduleService;
  let repository: ScheduleRepositoryInMemory;
  let request = {} as any;
  let payload = {} as ScheduleDTO;

  beforeEach(() => {
    repository = new ScheduleRepositoryInMemory();
    service = new ScheduleService(repository);
    sut = new ScheduleController(service);

    payload = {
      idusers: null,
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

    request = {
      user: { idusers: 1 },
      query: {},
    };
  });

  describe('Create', () => {
    it('Should create schedule', async () => {
      await sut.create(request, payload);
      expect(repository.schedules.length).toBe(1);
    });

    it('Should return status code 400 when invalid parameters', async () => {
      payload = {} as any;
      try {
        await sut.create(request, payload);
      } catch (error) {
        expect(error.status).toBe(400);
      }
      expect(repository.schedules.length).toBe(0);
    });

    it('Should return status code 409 when time schedule already exists', async () => {
      try {
        await sut.create(request, payload);
        await sut.create(request, payload);
      } catch (error) {
        expect(error.status).toBe(409);
      }
      expect(repository.schedules.length).toBe(0);
    });
  });

  describe('FindByDate', () => {
    it('Should return schedule by date', async () => {
      await sut.create(request, payload);
      request.query['date'] = payload.date;

      const result = await sut.findByDate(request);

      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('FindByClient', () => {
    it('Should return schedule by idclients', async () => {
      await sut.create(request, payload);
      request.query['idclients'] = payload.idclients;

      const result = await sut.findByClient(request);

      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('Should return status code 400 when idclients is not provided', async () => {
      await sut.create(request, payload);
      try {
        await sut.findByClient(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });
  });
});
