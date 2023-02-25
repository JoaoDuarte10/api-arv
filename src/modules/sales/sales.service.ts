import { Injectable } from '@nestjs/common';
import { SalesRepository } from './repository/sales-repository';
import { SalesDTO, SalesStatus } from './sales.dto';
import { TotalSalesIsEmptyException } from './exceptions/total-sales-is-empty';
import { InvalidStatusSalesException } from './exceptions/invalid-status-sales';
import { InvalidPaymentDateException } from './exceptions/invalid-payment-date';
import { SalesNotExistsException } from './exceptions/sales-not-exists';
import {
  PaymentMethodTypeTranslated,
  PaymentMethodType,
} from '../../types/payment';
import { InvalidParamsEntityException } from 'src/exceptions/invalid-params-entity';
import { InvalidParamsRequestException } from '../../exceptions/invalid-params-request';

@Injectable()
export class SalesService {
  constructor(private readonly salesRepository: SalesRepository) {}

  async create(sale: SalesDTO): Promise<void> {
    if (!sale.total) {
      throw new TotalSalesIsEmptyException('Total sales is empty');
    }
    if (
      sale.paymentStatus !== SalesStatus.PAID &&
      sale.paymentStatus !== SalesStatus.PENDING
    ) {
      throw new InvalidStatusSalesException('Status sales is invalid');
    }
    if (sale.paymentStatus === SalesStatus.PENDING && !sale.paymentDate) {
      throw new InvalidPaymentDateException('Payment date is invalid');
    }
    if (
      !sale.paymentMethod ||
      (sale.paymentMethod !== PaymentMethodTypeTranslated.BOLETO &&
        sale.paymentMethod !== PaymentMethodTypeTranslated.CARTAO_DE_CREDITO &&
        sale.paymentMethod !== PaymentMethodTypeTranslated.DINHEIRO &&
        sale.paymentMethod !== PaymentMethodTypeTranslated.PIX)
    ) {
      throw new InvalidPaymentDateException('Payment method is invalid');
    }
    if (sale.paymentStatus === SalesStatus.PAID && !sale.paymentDate) {
      sale.paymentDate = new Date().toISOString();
    }
    sale.paymentMethod = this.translatePaymentMethod(sale.paymentMethod);
    await this.salesRepository.create(sale);
  }

  async findByDate(idusers: number, date: string): Promise<SalesDTO[]> {
    const sales = await this.salesRepository.findByDate(idusers, date);
    return this.normalizePayload(sales);
  }

  async findByPeriod(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<SalesDTO[]> {
    const sales = await this.salesRepository.findByPeriod(
      idusers,
      date1,
      date2,
    );
    return this.normalizePayload(sales);
  }

  async findByClient(idusers: number, idclients: number): Promise<any> {
    const sales = await this.salesRepository.findByClient(idusers, idclients);
    return this.normalizePayload(sales);
  }

  async findPending(idusers: number): Promise<SalesDTO[]> {
    const sales = await this.salesRepository.findPending(idusers);
    return this.normalizePayload(sales);
  }

  async findPendingByClient(
    idusers: number,
    idclients: number,
  ): Promise<SalesDTO[]> {
    const sales = await this.salesRepository.findPendingByClient(
      idusers,
      idclients,
    );
    return this.normalizePayload(sales);
  }

  async findByAllFilters(params: {
    idusers: number;
    idclients: number;
    date: string;
    period: {
      date1: string;
      date2: string;
    };
    pending: boolean;
  }): Promise<SalesDTO[]> {
    if (
      !params.date &&
      !params.idclients &&
      !params.pending &&
      !params.period.date1 ||
      (params.period.date1 && !params.period.date2)
    ) {
      throw new InvalidParamsRequestException(
        'Preencha os campos corretamente',
      );
    }
    const sales = await this.salesRepository.findByAllFilters(params);
    return this.normalizePayload(sales);
  }

  async delete(idusers: number, idsales: number): Promise<void> {
    await this.salesRepository.delete(idusers, idsales);
  }

  async registerPayment(idusers: number, idsales: number): Promise<void> {
    const salesExists = await this.salesRepository.findOne(idusers, idsales);
    if (!salesExists) {
      throw new SalesNotExistsException('Sales not exists');
    }
    await this.salesRepository.registerPayment(idusers, idsales);
  }

  async findReports(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<any> {
    const reports = {};
    await Promise.all([
      this.salesRepository.getBasicInfoReports(idusers, date1, date2),
      this.salesRepository.getBiggestTotalWithRangeDate(idusers, date1, date2),
      this.salesRepository.getLowestTotalWithRangeDate(idusers, date1, date2),
    ]).then((result) => {
      if (!result[0] || !result[1] || !result[2]) {
        return;
      }
      reports['basicInfos'] = {
        total: Number(result[0].total),
        quantity: Number(result[0].quantity),
        average: Number(result[0].average),
        countClients: Number(result[0].count_clients),
        biggestValueSale: parseFloat(result[0].biggest_sale),
        lowestValueSales: parseFloat(result[0].lowest_sale),
      };
      reports['biggestTotalWithDate'] = {
        total: parseFloat(result[1].total),
        countTotal: parseFloat(result[1].count_total),
        date: result[1].date,
      };
      reports['lowestTotalWithDate'] = {
        total: parseFloat(result[2].total),
        countTotal: parseFloat(result[2].count_total),
        date: result[2].date,
      };
    });
    return reports;
  }

  private translatePaymentMethod(
    method: PaymentMethodTypeTranslated,
  ): PaymentMethodType {
    switch (method) {
      case PaymentMethodTypeTranslated.BOLETO:
        return PaymentMethodType.BILLET;
      case PaymentMethodTypeTranslated.CARTAO_DE_CREDITO:
        return PaymentMethodType.CREDIT_CARD;
      case PaymentMethodTypeTranslated.DINHEIRO:
        return PaymentMethodType.CASH;
      case PaymentMethodTypeTranslated.PIX:
        return PaymentMethodType.PIX;
    }
  }

  private translatePaymentMethodToBr(
    method: PaymentMethodType,
  ): PaymentMethodTypeTranslated {
    switch (method) {
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

  private normalizePayload(sales: SalesDTO[]): SalesDTO[] {
    return sales.map((sale) => {
      return {
        ...sale,
        paymentMethod: this.translatePaymentMethodToBr(
          sale.paymentMethod as PaymentMethodType,
        ),
      };
    });
  }
}
