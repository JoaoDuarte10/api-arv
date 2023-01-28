import { OutgoingController } from '../../../../src/modules/outgoing/outgoing.controller';
import {
  OutgoingDTO,
  OutgoingPaymentMethodTypeTranslated,
  OutgoingInstallmentTranslated,
} from '../../../../src/modules/outgoing/outgoing.dto';
import { UserDto } from '../../../../src/modules/users/user-dto';
import { OutgoingRepositoryInMemory } from '../../../../src/modules/outgoing/repository/outgoing.repository-in-memory';
import { OutgoingService } from '../../../../src/modules/outgoing/outgoing.service';

describe('Outgoing Integration', () => {
  let sut: OutgoingController;
  let service: OutgoingService;
  let repository: OutgoingRepositoryInMemory;

  let payload: OutgoingDTO;

  let request: { body: any; user: UserDto; query: any; params: any };

  beforeEach(() => {
    repository = new OutgoingRepositoryInMemory();
    service = new OutgoingService(repository);
    sut = new OutgoingController(service);

    request = {
      body: {},
      params: {},
      user: { idusers: 1 } as any,
      query: {},
    };

    payload = {
      idusers: 1,
      description: 'any description',
      date: new Date(),
      total: 15,
      paymentMethod: OutgoingPaymentMethodTypeTranslated.BOLETO,
      installment: false,
    };
  });

  describe('Create', () => {
    it('Should create a new outgoing', async () => {
      const result = await sut.create(request, payload);

      expect(result).toBeUndefined();
      expect(repository.outgoings.length).toBe(1);
      expect(repository.outgoings[0].idusers).toBe(request.user.idusers);
    });

    it('Should return status code 400 when idusers is not provided', async () => {
      delete request.user.idusers;

      try {
        await sut.create(request, payload);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('Should return status code 400 when paymentMethod is invalid', async () => {
      payload.paymentMethod = 'any' as any;

      try {
        await sut.create(request, payload);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('Should return status code 400 when total is invalid', async () => {
      payload.total = null;

      try {
        await sut.create(request, payload);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });
  });

  describe('Get Payment Method Enums', () => {
    it('Should return enums with paymentMethods', async () => {
      const result = sut.getPaymentMethodEnums();

      expect(result).toMatchObject({
        [OutgoingPaymentMethodTypeTranslated.BOLETO]:
          OutgoingPaymentMethodTypeTranslated.BOLETO,
        [OutgoingPaymentMethodTypeTranslated.CARTAO_DE_CREDITO]:
          OutgoingPaymentMethodTypeTranslated.CARTAO_DE_CREDITO,
        [OutgoingPaymentMethodTypeTranslated.DINHEIRO]:
          OutgoingPaymentMethodTypeTranslated.DINHEIRO,
        [OutgoingPaymentMethodTypeTranslated.PIX]:
          OutgoingPaymentMethodTypeTranslated.PIX,
      });
    });
  });

  describe('Get Installment Enums', () => {
    it('Should return enums with installments', async () => {
      const result = sut.getInstallmentEnums();

      expect(result).toMatchObject({
        [OutgoingInstallmentTranslated.A_VISTA]:
          OutgoingInstallmentTranslated.A_VISTA,
        [OutgoingInstallmentTranslated.PARCELADO]:
          OutgoingInstallmentTranslated.PARCELADO,
      });
    });
  });

  describe('Get All Outgoings', () => {
    beforeEach(async () => {
      await sut.create(request, payload);
      await sut.create(request, payload);
    });

    it('Should return all outgoings', async () => {
      const result = await sut.getAll(request);

      expect(result).toBeDefined();
      expect(result.length).toBe(2);
    });

    it('Should return status code 400 when idusers is not provided', async () => {
      delete request.user.idusers;

      try {
        await sut.getAll(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('Should return paymentMethod translated to pt-BR', async () => {
      request.user.idusers = 5;
      payload.paymentMethod = OutgoingPaymentMethodTypeTranslated.BOLETO;
      await sut.create(request, payload);

      const result = await sut.getAll(request);

      expect(result[0].paymentMethod).toBe(
        OutgoingPaymentMethodTypeTranslated.BOLETO,
      );
    });
  });

  describe('Get By Date', () => {
    const date = new Date();

    beforeEach(async () => {
      payload.date = date;
      await sut.create(request, payload);
      await sut.create(request, payload);
    });

    it('Should return outgoings by date', async () => {
      request.query['date'] = date;
      const result = await sut.getByDate(request);

      expect(result).toBeDefined();
      expect(result.length).toBe(2);
    });

    it('Should return status code 400 when idusers is not provided', async () => {
      delete request.user.idusers;

      try {
        await sut.getByDate(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('Should return status code 400 when date is not provided', async () => {
      delete request.query['date'];
      try {
        await sut.getByDate(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });
  });

  describe('Get By Period', () => {
    const date1 = new Date();
    const date2 = new Date();
    date2.setDate(date2.getDate() + 1);

    beforeEach(async () => {
      payload.date = date1;
      await sut.create(request, payload);
      payload.date = date2;
      await sut.create(request, payload);
    });

    it('Should return outgoings by beriod', async () => {
      request.query['date1'] = date1;
      request.query['date2'] = date2;

      await sut.create(request, payload);

      const result = await sut.getByPeriod(request);

      expect(result.length).toBe(3);
    });

    it('Should return status code 400 when idusers is not provided', async () => {
      delete request.user.idusers;
      request.query['date1'] = date1;
      request.query['date2'] = date2;

      try {
        await sut.getByPeriod(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('Should return status code 400 when date1 is not provided', async () => {
      request.query['date2'] = date2;

      try {
        await sut.getByPeriod(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('Should return status code 400 when date2 is not provided', async () => {
      request.query['date1'] = date1;

      try {
        await sut.getByPeriod(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('Should return status code 400 when period is not provided', async () => {
      request.query = {};

      try {
        await sut.getByPeriod(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('Should return status code 400 when date1 is greater than date2 or date2 is smaller than date1', async () => {
      request.query['date1'] = date2;
      request.query['date2'] = date1;

      try {
        await sut.getByPeriod(request);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });
  });
});
