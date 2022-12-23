import { CreateClientController } from '../../../../src/modules/clients/controller/create-client';
import { CreateClientService } from '../../../../src/modules/clients/services/create';
import { ClientDto } from '../../../../src/modules/clients/client-dto';
import { ClientRepositoryInMemory } from '../../../../src/modules/clients/repository/client.repository-in-memory';
import { UpdateClientController } from '../../../../src/modules/clients/controller/update-client';
import { UpdateClientService } from '../../../../src/modules/clients/services/update';
import { DeleteClientController } from '../../../../src/modules/clients/controller/delete';
import { DeleteClientService } from '../../../../src/modules/clients/services/delete';

describe('Client Integration', () => {
  let repository: ClientRepositoryInMemory;
  let request = {} as any;
  let payload = {} as ClientDto;

  beforeEach(() => {
    repository = new ClientRepositoryInMemory();

    payload = {
      idclients: 1,
      idusers: 1,
      name: 'any_name',
      email: 'any@mail.com',
      phone: '(99) 9 9999-9999',
      idsegment: null,
      address: 'Rua logo ali',
      addressNumber: 999,
      note: null,
      created_at: new Date().toISOString(),
      updated_at: null,
    };

    request = {
      user: { idusers: 1 },
      query: {},
    };
  });

  describe('Create', () => {
    let sut: CreateClientController;
    let service: CreateClientService;

    beforeEach(() => {
      service = new CreateClientService(repository);
      sut = new CreateClientController(service);
    });

    it('Should create a sales', async () => {
      await sut.handle(request, payload);
      expect(repository.clients.length).toBe(1);
    });

    it('Should return status code 409 when client already exists', async () => {
      await sut.handle(request, payload);
      try {
        await sut.handle(request, payload);
      } catch (error) {
        expect(error.status).toBe(409);
      }
      expect(repository.clients.length).toBe(1);
    });
  });

  describe('Update', () => {
    let sut: UpdateClientController;
    let service: UpdateClientService;

    beforeEach(async () => {
      service = new UpdateClientService(repository);
      sut = new UpdateClientController(service);

      const serviceCreate = new CreateClientService(repository);
      const createController = new CreateClientController(serviceCreate);
      await createController.handle(request, payload);
    });

    it('Should update a client', async () => {
      const newName = 'Update name';
      payload.name = newName;
      await sut.handle(request, payload);
      expect(repository.clients[0].name).toBe(newName);
    });

    it('Should return status code 404 when client not exists', async () => {
      const newName = 'Update name';
      payload.name = newName;
      payload.idclients = Math.random();
      try {
        await sut.handle(request, payload);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });

  describe('Update', () => {
    let sut: DeleteClientController;
    let service: DeleteClientService;

    beforeEach(async () => {
      service = new DeleteClientService(repository);
      sut = new DeleteClientController(service);

      const serviceCreate = new CreateClientService(repository);
      const createController = new CreateClientController(serviceCreate);
      await createController.handle(request, payload);
    });

    it('Should delete a client', async () => {
      request.query['idclients'] = payload.idclients;
      await sut.handle(request);
      expect(repository.clients.length).toBe(0);
    });

    it('Should return status code 404 case client not exists in delete', async () => {
      request.query['idclients'] = Math.random();
      try {
        await sut.handle(request);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });
});
