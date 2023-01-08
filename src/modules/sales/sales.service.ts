import { Injectable } from '@nestjs/common';
import { SalesRepository } from './repository/sales.repository-postgres';
import { SalesDTO, SalesStatus } from './sales.dto';
import { TotalSalesIsEmptyException } from './exceptions/total-sales-is-empty';
import { InvalidStatusSalesException } from './exceptions/invalid-status-sales';
import { InvalidPaymentDateException } from './exceptions/invalid-payment-date';
import { SalesNotExistsException } from './exceptions/sales-not-exists';

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
    if (sale.paymentStatus === SalesStatus.PAID && !sale.paymentDate) {
      sale.paymentDate = new Date().toISOString();
    }
    await this.salesRepository.create(sale);
  }

  async findByDate(idusers: number, date: string): Promise<SalesDTO[]> {
    return await this.salesRepository.findByDate(idusers, date);
  }

  async findByPeriod(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<SalesDTO[]> {
    return await this.salesRepository.findByPeriod(idusers, date1, date2);
  }

  async findByClient(idusers: number, idclients: number): Promise<any> {
    return await this.salesRepository.findByClient(idusers, idclients);
  }

  async findPending(idusers: number): Promise<SalesDTO[]> {
    return await this.salesRepository.findPending(idusers);
  }

  async findPendingByClient(
    idusers: number,
    idclients: number,
  ): Promise<SalesDTO[]> {
    return await this.salesRepository.findPendingByClient(idusers, idclients);
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
}
