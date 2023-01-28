import {
  OutgoingDTO,
  OutgoingInstallmentTranslated,
} from '../../../../src/modules/outgoing/outgoing.dto';
import { OutgoingService } from '../../../../src/modules/outgoing/outgoing.service';
import { OutgoingRepositoryInMemory } from '../../../../src/modules/outgoing/repository/outgoing.repository-in-memory';
import {
  PaymentMethodType,
  PaymentMethodTypeTranslated,
} from '../../../../src/types/payment';

describe('Outgoing Service', () => {
  let sut: OutgoingService;
  let repository: OutgoingRepositoryInMemory;

  let payload: OutgoingDTO;

  beforeEach(() => {
    repository = new OutgoingRepositoryInMemory();
    sut = new OutgoingService(repository);

    payload = {
      idusers: 1,
      description: 'any description',
      date: new Date(),
      total: 15,
      paymentMethod: PaymentMethodType.PIX,
      installment: false,
    };
  });

  describe('GetAll', () => {
    it('Should return paymentMethod translated with OutgoingPaymentMethodType.PIX', async () => {
      payload.paymentMethod = PaymentMethodType.PIX;
      await sut.create(payload);

      const result = await sut.getAll(payload.idusers);

      expect(result[0].paymentMethod).toBe(PaymentMethodTypeTranslated.PIX);
    });

    it('Should return paymentMethod translated with OutgoingPaymentMethodType.BILLET', async () => {
      payload.paymentMethod = PaymentMethodTypeTranslated.BOLETO;
      await sut.create(payload);

      const result = await sut.getAll(payload.idusers);

      expect(result[0].paymentMethod).toBe(PaymentMethodTypeTranslated.BOLETO);
    });

    it('Should return paymentMethod translated with OutgoingPaymentMethodType.CREDIT_CARD', async () => {
      payload.paymentMethod = PaymentMethodTypeTranslated.CARTAO_DE_CREDITO;
      await sut.create(payload);

      const result = await sut.getAll(payload.idusers);

      expect(result[0].paymentMethod).toBe(
        PaymentMethodTypeTranslated.CARTAO_DE_CREDITO,
      );
    });

    it('Should return paymentMethod translated with OutgoingPaymentMethodType.CASH', async () => {
      payload.paymentMethod = PaymentMethodTypeTranslated.DINHEIRO;
      await sut.create(payload);

      const result = await sut.getAll(payload.idusers);

      expect(result[0].paymentMethod).toBe(
        PaymentMethodTypeTranslated.DINHEIRO,
      );
    });

    it('Should return installment translated when installment to be true', async () => {
      payload.installment = true;
      await sut.create(payload);

      const result = await sut.getAll(payload.idusers);

      expect(result[0].installment).toBe(
        OutgoingInstallmentTranslated.PARCELADO,
      );
    });

    it('Should return installment translated when installment to be false', async () => {
      payload.installment = false;
      await sut.create(payload);

      const result = await sut.getAll(payload.idusers);

      expect(result[0].installment).toBe(OutgoingInstallmentTranslated.A_VISTA);
    });
  });

  describe('GetByDate', () => {
    it('Should return paymentMethod translated with OutgoingPaymentMethodType.PIX', async () => {
      payload.paymentMethod = PaymentMethodTypeTranslated.PIX;
      await sut.create(payload);

      const result = await sut.getByDate(payload.idusers, payload.date);

      expect(result[0].paymentMethod).toBe(PaymentMethodTypeTranslated.PIX);
    });

    it('Should return paymentMethod translated with OutgoingPaymentMethodType.BILLET', async () => {
      payload.paymentMethod = PaymentMethodTypeTranslated.BOLETO;
      await sut.create(payload);

      const result = await sut.getByDate(payload.idusers, payload.date);

      expect(result[0].paymentMethod).toBe(PaymentMethodTypeTranslated.BOLETO);
    });

    it('Should return paymentMethod translated with OutgoingPaymentMethodType.CREDIT_CARD', async () => {
      payload.paymentMethod = PaymentMethodTypeTranslated.CARTAO_DE_CREDITO;
      await sut.create(payload);

      const result = await sut.getByDate(payload.idusers, payload.date);

      expect(result[0].paymentMethod).toBe(
        PaymentMethodTypeTranslated.CARTAO_DE_CREDITO,
      );
    });

    it('Should return paymentMethod translated with OutgoingPaymentMethodType.CASH', async () => {
      payload.paymentMethod = PaymentMethodTypeTranslated.DINHEIRO;
      await sut.create(payload);

      const result = await sut.getByDate(payload.idusers, payload.date);

      expect(result[0].paymentMethod).toBe(
        PaymentMethodTypeTranslated.DINHEIRO,
      );
    });

    it('Should return installment translated when installment to be true', async () => {
      payload.installment = true;
      await sut.create(payload);

      const result = await sut.getByDate(payload.idusers, payload.date);

      expect(result[0].installment).toBe(
        OutgoingInstallmentTranslated.PARCELADO,
      );
    });

    it('Should return installment translated when installment to be false', async () => {
      payload.installment = false;
      await sut.create(payload);

      const result = await sut.getByDate(payload.idusers, payload.date);

      expect(result[0].installment).toBe(OutgoingInstallmentTranslated.A_VISTA);
    });
  });

  describe('GetByPeriod', () => {
    it('Should return paymentMethod translated with OutgoingPaymentMethodType.PIX', async () => {
      payload.paymentMethod = PaymentMethodTypeTranslated.PIX;
      await sut.create(payload);

      const result = await sut.getByPeriod(
        payload.idusers,
        payload.date,
        payload.date,
      );

      expect(result[0].paymentMethod).toBe(PaymentMethodTypeTranslated.PIX);
    });

    it('Should return paymentMethod translated with OutgoingPaymentMethodType.BILLET', async () => {
      payload.paymentMethod = PaymentMethodTypeTranslated.BOLETO;
      await sut.create(payload);

      const result = await sut.getByPeriod(
        payload.idusers,
        payload.date,
        payload.date,
      );

      expect(result[0].paymentMethod).toBe(PaymentMethodTypeTranslated.BOLETO);
    });

    it('Should return paymentMethod translated with OutgoingPaymentMethodType.CREDIT_CARD', async () => {
      payload.paymentMethod = PaymentMethodTypeTranslated.CARTAO_DE_CREDITO;
      await sut.create(payload);

      const result = await sut.getByPeriod(
        payload.idusers,
        payload.date,
        payload.date,
      );

      expect(result[0].paymentMethod).toBe(
        PaymentMethodTypeTranslated.CARTAO_DE_CREDITO,
      );
    });

    it('Should return paymentMethod translated with OutgoingPaymentMethodType.CASH', async () => {
      payload.paymentMethod = PaymentMethodTypeTranslated.DINHEIRO;
      await sut.create(payload);

      const result = await sut.getByPeriod(
        payload.idusers,
        payload.date,
        payload.date,
      );

      expect(result[0].paymentMethod).toBe(
        PaymentMethodTypeTranslated.DINHEIRO,
      );
    });

    it('Should return installment translated when installment to be true', async () => {
      payload.installment = true;
      await sut.create(payload);

      const result = await sut.getByPeriod(
        payload.idusers,
        payload.date,
        payload.date,
      );

      expect(result[0].installment).toBe(
        OutgoingInstallmentTranslated.PARCELADO,
      );
    });

    it('Should return installment translated when installment to be false', async () => {
      payload.installment = false;
      await sut.create(payload);

      const result = await sut.getByPeriod(
        payload.idusers,
        payload.date,
        payload.date,
      );

      expect(result[0].installment).toBe(OutgoingInstallmentTranslated.A_VISTA);
    });
  });
});
