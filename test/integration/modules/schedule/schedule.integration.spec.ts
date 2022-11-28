import { ScheduleController } from '../../../../src/modules/schedules/schedule.controller';
import { ScheduleService } from '../../../../src/modules/schedules/schedule.service';
import { ScheduleRepositoryInMemory } from '../../../../src/modules/schedules/repository/schedule.repository-in-memory';
describe('ScheduleIntegration', () => {
  let sut: ScheduleController;
  let service: ScheduleService;
  let repository: ScheduleRepositoryInMemory;
  let request = {} as any;
  let payload = {} as any;

  beforeEach(() => {
    repository = new ScheduleRepositoryInMemory();
    service = new ScheduleService(repository);
    sut = new ScheduleController(service);

    payload = {
      idclients: 1,
      clientName: null,
      description: 'any_description',
      time: new Date().getTime(),
      date: new Date().toISOString(),
      pacote: false,
      atendenceCount: 0,
      totalAtendenceCount: 0,
      status: 'PENDING',
    };

    request = {
      user: { idusers: 1 },
    };
  });

  it('Should create schedule', async () => {
    await sut.create(request, payload);
    expect(repository.schedules.length).toBe(1);
  });

  it('Should return status code 400 when invalid parameters', async () => {
    payload = {};
    try {
      await sut.create(request, payload);
    } catch (error) {
      expect(error.status).toBe(400);
    }
    expect(repository.schedules.length).toBe(0);
  });
});
