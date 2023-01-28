import {
  OutgoingDTO,
  OutgoingPaymentMethodType,
  OutgoingPaymentMethodTypeTranslated,
} from '../outgoing.dto';
import { InvalidOutgoingException } from './exceptions/invalid-outgoing';
import { InvalidParamsEntityException } from '../../../exceptions/invalid-params-entity';

export class OutgoingEntity {
  private constructor(private readonly props: OutgoingDTO) {}

  static create(
    params: OutgoingDTO,
  ): OutgoingEntity | InvalidOutgoingException {
    const errors = [];

    if (
      !params.paymentMethod ||
      (params.paymentMethod !== OutgoingPaymentMethodTypeTranslated.BOLETO &&
        params.paymentMethod !== OutgoingPaymentMethodTypeTranslated.DINHEIRO &&
        params.paymentMethod !==
          OutgoingPaymentMethodTypeTranslated.CARTAO_DE_CREDITO &&
        params.paymentMethod !== OutgoingPaymentMethodTypeTranslated.PIX)
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

    switch (params.paymentMethod) {
      case OutgoingPaymentMethodTypeTranslated.BOLETO:
        params.paymentMethod = OutgoingPaymentMethodType.BILLET;
        break;
      case OutgoingPaymentMethodTypeTranslated.DINHEIRO:
        params.paymentMethod = OutgoingPaymentMethodType.CASH;
        break;
      case OutgoingPaymentMethodTypeTranslated.CARTAO_DE_CREDITO:
        params.paymentMethod = OutgoingPaymentMethodType.CREDIT_CARD;
        break;
      case OutgoingPaymentMethodTypeTranslated.PIX:
        params.paymentMethod = OutgoingPaymentMethodType.PIX;
        break;
    }

    return new OutgoingEntity(params);
  }

  getProps(): OutgoingDTO {
    return this.props;
  }
}
