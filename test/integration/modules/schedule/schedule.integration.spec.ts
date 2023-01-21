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
      idschedules: 1,
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
      body: {},
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
      expect(repository.schedules.length).toBe(1);
    });

    it('Should return status code 400 when pacote is true and totalAtendenceCount to equal 0', async () => {
      payload.pacote = true;
      payload.totalAtendenceCount = 0;
      try {
        await sut.create(request, payload);
      } catch (error) {
        expect(error.status).toBe(400);
      }
      expect(repository.schedules.length).toBe(0);
    });

    it('Should create schedule when idclients is null', async () => {
      delete payload.idclients;
      payload.clientName = 'Any Name';

      await sut.create(request, payload);

      expect(repository.schedules.length).toBe(1);
    });
  });

  describe('Update', () => {
    it('Should update a schedule', async () => {
      await sut.create(request, payload);
      const newDescription = 'Update description';
      payload.description = newDescription;
      await sut.update(request, payload);
      expect(repository.schedules[0].description).toBe(newDescription);
    });

    it('Should return status code 400 when idschedules is not provided', async () => {
      await sut.create(request, payload);
      const newDescription = 'Update description';
      payload.description = newDescription;
      delete payload.idschedules;
      try {
        await sut.update(request, payload);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('Should return status code 400 when status to be FINISHED', async () => {
      await sut.create(request, payload);
      payload.status = ScheduleStatus.FINISHED;
      try {
        await sut.update(request, payload);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('Should return status code 404 when schedule not exists', async () => {
      payload.idschedules = Math.random();
      try {
        await sut.update(request, payload);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });

  describe('FindByDate', () => {
    it('Should return schedule by date', async () => {
      await sut.create(request, payload);
      request.query['date'] = payload.date;

      const result = await sut.findByDate(request);

      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('Should return status code 400 when idschedules is not provided', async () => {
      try {
        await sut.findByDate(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });
  });

  describe('FindByClient', () => {
    it('Should return schedule by idclients', async () => {
      await sut.create(request, payload);
      request.query['idclients'] = payload.idclients;

      const result = await sut.findByIdClient(request);

      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('Should return status code 400 when idclients is not provided', async () => {
      await sut.create(request, payload);
      try {
        await sut.findByIdClient(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });
  });

  describe('Find by client name', () => {
    it('Should return schedule by client name, not idclient', async () => {
      const clientName = 'any client';
      payload.clientName = clientName;
      request.query['clientName'] = clientName;
      await sut.create(request, payload);

      const result = await sut.findByClientName(request);

      expect(result.length).toBe(1);
    });

    it('Should return status code 400 when client name is not provided', async () => {
      request.query['clientName'] = null;
      try {
        await sut.findByClientName(request);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });
  });

  describe('FindAllExpireds', () => {
    it('Should return all schedules expireds', async () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      payload.idusers = request.user.idusers;
      payload.date = date.toString();
      await repository.create(payload);
      const result = await sut.findAllExpireds(request);
      expect(result.length).toBe(1);
    });
  });

  describe('Delete', () => {
    it('Should delete a schedule', async () => {
      await sut.create(request, payload);
      request.query['idschedules'] = payload.idschedules;
      await sut.delete(request);
      expect(repository.schedules.length).toBe(0);
    });

    it('Should return status code 404 when schedule not exists', async () => {
      request.query['idschedules'] = 2;
      try {
        await sut.delete(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });

    it('Should return status code 400 when idschedule is invalid', async () => {
      try {
        await sut.delete(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });
  });

  describe('Finish', () => {
    beforeEach(async () => {
      await sut.create(request, payload);
    });

    it('Should finish schedule', async () => {
      request.body['idschedules'] = payload.idschedules;
      await sut.finish(request);
      expect(repository.schedules[0].status).toBe(ScheduleStatus.FINISHED);
    });

    it('Should return status code 404 when schedule not exists', async () => {
      try {
        request.body = { idschedules: Math.random() };
        await sut.finish(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });

    it('Should return status code 404 when idschedules is not provided', async () => {
      try {
        await sut.finish(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('Should add + 1 in atendenceCount when pacote is true and atendenceCount < totalAtendenceCount', async () => {
      payload.time = '12:00';
      payload.idschedules = 2;
      payload.pacote = true;
      payload.totalAtendenceCount = 2;
      await sut.create(request, payload);
      request.body['idschedules'] = payload.idschedules;

      await sut.finish(request);

      expect(repository.schedules[1].atendenceCount).toBe(1);
      expect(repository.schedules[1].status).toBe(ScheduleStatus.PENDING);
    });

    it('Should finished schedule when pacote is true', async () => {
      payload.time = '12:00';
      payload.idschedules = 2;
      payload.pacote = true;
      payload.totalAtendenceCount = 2;

      await sut.create(request, payload);
      request.body['idschedules'] = payload.idschedules;

      await sut.finish(request);
      await sut.finish(request);

      expect(repository.schedules[1].status).toBe(ScheduleStatus.FINISHED);
    });
  });

  describe('GetAllFinished', () => {
    beforeEach(async () => {
      await sut.create(request, payload);
      request.body['idschedules'] = payload.idschedules;
      await sut.finish(request);
    });

    it('Should return schedules finisehds', async () => {
      const result = await sut.getAllFinished(request);
      expect(result[0].status).toBe(ScheduleStatus.FINISHED);
    });
  });
});
