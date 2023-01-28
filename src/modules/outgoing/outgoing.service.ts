import { OutgoingRepository } from './repository/outgoing.repository';
import { Injectable } from '@nestjs/common';
import {
  OutgoingDTO,
  OutgoingPaymentMethodType,
  OutgoingPaymentMethodTypeTranslated,
  OutgoingInstallmentTranslated,
} from './outgoing.dto';
import { OutgoingEntity } from './domain/outgoing.entity';
import { InvalidOutgoingException } from './domain/exceptions/invalid-outgoing';
import { InvalidParamsRequestException } from '../../exceptions/invalid-params-request';

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

  getPaymentMethodEnums(): OutgoingPaymentMethodTypeTranslated {
    return {
      [OutgoingPaymentMethodTypeTranslated.BOLETO]:
        OutgoingPaymentMethodTypeTranslated.BOLETO,
      [OutgoingPaymentMethodTypeTranslated.CARTAO_DE_CREDITO]:
        OutgoingPaymentMethodTypeTranslated.CARTAO_DE_CREDITO,
      [OutgoingPaymentMethodTypeTranslated.DINHEIRO]:
        OutgoingPaymentMethodTypeTranslated.DINHEIRO,
      [OutgoingPaymentMethodTypeTranslated.PIX]:
        OutgoingPaymentMethodTypeTranslated.PIX,
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
          outgoing.paymentMethod as OutgoingPaymentMethodType,
        ),
        installment: this.translatedInstallment(
          outgoing.installment as boolean,
        ),
      };
    });
  }

  private translatedPaymentMethod(
    paymentMethod: OutgoingPaymentMethodType,
  ): OutgoingPaymentMethodTypeTranslated {
    switch (paymentMethod) {
      case OutgoingPaymentMethodType.BILLET:
        return OutgoingPaymentMethodTypeTranslated.BOLETO;
      case OutgoingPaymentMethodType.CASH:
        return OutgoingPaymentMethodTypeTranslated.DINHEIRO;
      case OutgoingPaymentMethodType.CREDIT_CARD:
        return OutgoingPaymentMethodTypeTranslated.CARTAO_DE_CREDITO;
      case OutgoingPaymentMethodType.PIX:
        return OutgoingPaymentMethodTypeTranslated.PIX;
    }
  }

  private translatedInstallment(
    installment: boolean,
  ): OutgoingInstallmentTranslated {
    return installment
      ? OutgoingInstallmentTranslated.PARCELADO
      : OutgoingInstallmentTranslated.A_VISTA;
  }
}
