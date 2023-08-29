import { OutgoingRepository } from './repository/outgoing.repository';
import { Injectable } from '@nestjs/common';
import { OutgoingDTO, OutgoingInstallmentTranslated } from './outgoing.dto';
import { OutgoingEntity } from './domain/outgoing.entity';
import { InvalidOutgoingException } from './domain/exceptions/invalid-outgoing';
import { InvalidParamsRequestException } from '../../exceptions/invalid-params-request';
import {
  PaymentMethodTypeTranslated,
  PaymentMethodType,
} from '../../types/payment';

@Injectable()
export class OutgoingService {
  constructor(private readonly outgoingRepository: OutgoingRepository) {}

  async create(params: OutgoingDTO): Promise<void> {
    const outgoing = OutgoingEntity.create(params);

    if (outgoing instanceof InvalidOutgoingException) {
      throw new InvalidParamsRequestException(
        outgoing.getMessage(),
        outgoing.getDetails(),
      );
    }

    await this.outgoingRepository.create(outgoing.getProps());
  }

  getPaymentMethodEnums(): PaymentMethodTypeTranslated {
    return {
      [PaymentMethodTypeTranslated.BOLETO]: PaymentMethodTypeTranslated.BOLETO,
      [PaymentMethodTypeTranslated.CARTAO_DE_CREDITO]:
        PaymentMethodTypeTranslated.CARTAO_DE_CREDITO,
      [PaymentMethodTypeTranslated.DINHEIRO]:
        PaymentMethodTypeTranslated.DINHEIRO,
      [PaymentMethodTypeTranslated.PIX]: PaymentMethodTypeTranslated.PIX,
      [PaymentMethodTypeTranslated.MIX]: PaymentMethodTypeTranslated.MIX,
    } as any;
  }

  getInstallmentEnums(): OutgoingInstallmentTranslated {
    return {
      [OutgoingInstallmentTranslated.A_VISTA]:
        OutgoingInstallmentTranslated.A_VISTA,
      [OutgoingInstallmentTranslated.PARCELADO]:
        OutgoingInstallmentTranslated.PARCELADO,
    } as any;
  }

  async getAll(idusers: number): Promise<OutgoingDTO[]> {
    const outgoings = await this.outgoingRepository.getAll(idusers);
    return this.normalizePayload(outgoings);
  }

  async getByDate(idusers: number, date: Date): Promise<OutgoingDTO[]> {
    const outgoings = await this.outgoingRepository.getByDate(idusers, date);
    return this.normalizePayload(outgoings);
  }

  async getByPeriod(
    idusers: number,
    date1: Date,
    date2: Date,
  ): Promise<OutgoingDTO[]> {
    if (date1 > date2 || date2 < date1) {
      throw new InvalidParamsRequestException(
        'Date 1 cannot be greater than date 2',
      );
    }
    const outgoings = await this.outgoingRepository.getByPeriod(
      idusers,
      date1,
      date2,
    );
    return this.normalizePayload(outgoings);
  }

  private normalizePayload(payload: any[]): OutgoingDTO[] {
    return payload.map((outgoing) => {
      return {
        ...outgoing,
        total: Number(outgoing.total),
        paymentMethod: this.translatedPaymentMethod(
          outgoing.paymentMethod as PaymentMethodType,
        ),
        installment: this.translatedInstallment(
          outgoing.installment as boolean,
        ),
      };
    });
  }

  private translatedPaymentMethod(
    paymentMethod: PaymentMethodType,
  ): PaymentMethodTypeTranslated {
    switch (paymentMethod) {
      case PaymentMethodType.BILLET:
        return PaymentMethodTypeTranslated.BOLETO;
      case PaymentMethodType.CASH:
        return PaymentMethodTypeTranslated.DINHEIRO;
      case PaymentMethodType.CREDIT_CARD:
        return PaymentMethodTypeTranslated.CARTAO_DE_CREDITO;
      case PaymentMethodType.PIX:
        return PaymentMethodTypeTranslated.PIX;
    }
  }

  private translatedInstallment(
    installment: boolean,
  ): OutgoingInstallmentTranslated {
    return installment
      ? OutgoingInstallmentTranslated.PARCELADO
      : OutgoingInstallmentTranslated.A_VISTA;
  }

  async delete(idusers: number, idoutgoing: number): Promise<void> {
    await this.outgoingRepository.delete(idusers, idoutgoing);
  }
}
