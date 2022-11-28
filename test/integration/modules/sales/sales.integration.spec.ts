import { SalesController } from '../../../../src/modules/sales/sales.controller';
import { SalesService } from '../../../../src/modules/sales/sales.service';
import { SalesRepositoryInMemory } from '../../../../src/modules/sales/repository/sales.repository-in-memory';
import { SalesStatus } from '../../../../src/modules/sales/sales.dto';

describe('Sales Integration', () => {
  let sut: SalesController;
  let service: SalesService;
  let repository: SalesRepositoryInMemory;
  let request = {} as any;
  let payload = {} as any;

  beforeEach(() => {
    repository = new SalesRepositoryInMemory();
    service = new SalesService(repository as any);
    sut = new SalesController(service);

    request = {
      user: { idusers: 1 },
      query: {},
    };
    payload = {
      idclients: 1,
      description: 'Teste',
      date: new Date().toISOString(),
      total: 19.5,
      paymentStatus: 'PENDING',
      paymentDate: new Date().toISOString(),
    };
  });

  describe('Create', () => {
    it('Should create sale', async () => {
      await sut.create(request, payload);
      expect(repository.sales.length).toBe(1);
    });

    it('Should return error when total sales is empty', async () => {
      payload.total = 0;
      expect(sut.create(request, payload)).rejects.toThrow();
    });

    it('Should return status code 400 when total sales is empty', async () => {
      payload.total = 0;
      try {
        await sut.create(request, payload);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('Should return status code 400 when paymentStatus is invalid', async () => {
      payload.paymentStatus = 'any';
      try {
        await sut.create(request, payload);
      } catch (error) {
        expect(error.status).toBe(400);
      }
      expect(repository.sales.length).toBe(0);
    });

    it('Should return status code 400 when paymentDate not provided when paymentStatus to be PENDING', async () => {
      payload.paymentStatus = SalesStatus.PENDING;
      delete payload.paymentDate;

      try {
        await sut.create(request, payload);
      } catch (error) {
        expect(error.status).toBe(400);
      }
      expect(repository.sales.length).toBe(0);
    });

    it('Should set new date in paymentDate field when paymentStatus to be PAID', async () => {
      payload.paymentStatus = SalesStatus.PAID;
      payload.paymentDate = null;

      await sut.create(request, payload);

      expect(repository.sales[0].paymentDate).not.toBeFalsy();
    });
  });

  describe('FindByDate', () => {
    it('Should return sales by date', async () => {
      await sut.create(request, payload);
      request.query['date'] = payload.date;
      const result = await sut.findByDate(request);
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('Should return status code 400 when date is not provided', async () => {
      delete payload.date;
      try {
        await sut.findByDate(request);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });
  });

  describe('FindByPeriod', () => {
    it('Should return sales by period', async () => {
      await sut.create(request, payload);
      request.query['date1'] = payload.date;
      request.query['date2'] = payload.date;
      const result = await sut.findByPeriod(request);
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('Should return status code 400 when range date is not provided', async () => {
      delete payload.date;
      try {
        await sut.findByPeriod(request);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });
  });

  describe('FindByClient', () => {
    it('Should return sales by client', async () => {
      await sut.create(request, payload);
      request.query['idclients'] = payload.idclients;
      const result = await sut.findByClient(request);
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('Should return status code 400 when idclients is not provided', async () => {
      delete payload.idclients;
      try {
        await sut.findByClient(request);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });
  });

  describe('Delete', () => {
    it('Should delete a sales', async () => {
      await sut.create(request, payload);
      request.query['idsales'] = repository.sales[0].idsales;
      const result = await sut.delete(request);
      expect(result).toBeUndefined();
      expect(repository.sales.length).toBe(0);
    });

    it('Should return status code 400 when idsales is not provided', async () => {
      try {
        await sut.delete(request);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });
  });

  describe('RegisterPayment', () => {
    it('Should register payment of the sales', async () => {
      await sut.create(request, payload);
      const idsales = repository.sales[0].idsales;
      request.query['idsales'] = idsales;
      await sut.registerPayment(request);
      expect(repository.sales[0].paymentStatus).toBe(SalesStatus.PAID);
    });

    it('Should return status code 404 when sale not found', async () => {
      request.query['idsales'] = 1;
      try {
        await sut.registerPayment(request);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });

    it('Should return status code 400 when idsales is not provided', async () => {
      try {
        await sut.registerPayment(request);
      } catch (error) {
        console.log(error);
        expect(error.status).toBe(400);
      }
    });
  });
});
