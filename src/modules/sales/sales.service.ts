import { Injectable } from '@nestjs/common';
import { SalesRepository } from './sales.repository';
import { SalesDTO, SalesStatus } from './sales.dto';
import { TotalSalesIsEmptyException } from './exceptions/total-sales-is-empty';
import { InvalidStatusSalesException } from './exceptions/invalid-status-sales';

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

  async delete(idusers: number, idsales: number): Promise<void> {
    await this.salesRepository.delete(idusers, idsales);
  }
}