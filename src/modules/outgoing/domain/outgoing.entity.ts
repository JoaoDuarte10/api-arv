import { OutgoingDTO, OutgoingInstallmentTranslated } from '../outgoing.dto';
import { InvalidOutgoingException } from './exceptions/invalid-outgoing';
import { InvalidParamsEntityException } from '../../../exceptions/invalid-params-entity';
import {
  PaymentMethodTypeTranslated,
  PaymentMethodType,
} from '../../../types/payment';

export class OutgoingEntity {
  private constructor(private readonly props: OutgoingDTO) {}

  static create(
    params: OutgoingDTO,
  ): OutgoingEntity | InvalidOutgoingException {
    const errors = [];

    if (
      !params.paymentMethod ||
      (params.paymentMethod !== PaymentMethodTypeTranslated.BOLETO &&
        params.paymentMethod !== PaymentMethodTypeTranslated.DINHEIRO &&
        params.paymentMethod !==
          PaymentMethodTypeTranslated.CARTAO_DE_CREDITO &&
        params.paymentMethod !== PaymentMethodTypeTranslated.PIX)
    ) {
      errors.push(
        new InvalidParamsEntityException('Payment method is invalid'),
      );
    }

    if (!params.total) {
      errors.push(new InvalidParamsEntityException('Total is invalid'));
    }

    if (errors.length) {
      return new InvalidOutgoingException(
        'Invalids params for create outgoing entity',
        errors,
      );
    }

    switch (params.installment) {
      case OutgoingInstallmentTranslated.A_VISTA:
        params.installment = false;
        break;
      case OutgoingInstallmentTranslated.PARCELADO:
        params.installment = true;
        break;
    }

    switch (params.paymentMethod) {
      case PaymentMethodTypeTranslated.BOLETO:
        params.paymentMethod = PaymentMethodType.BILLET;
        break;
      case PaymentMethodTypeTranslated.DINHEIRO:
        params.paymentMethod = PaymentMethodType.CASH;
        break;
      case PaymentMethodTypeTranslated.CARTAO_DE_CREDITO:
        params.paymentMethod = PaymentMethodType.CREDIT_CARD;
        break;
      case PaymentMethodTypeTranslated.PIX:
        params.paymentMethod = PaymentMethodType.PIX;
        break;
    }

    return new OutgoingEntity(params);
  }

  getProps(): OutgoingDTO {
    return this.props;
  }
}
