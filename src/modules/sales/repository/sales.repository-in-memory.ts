import { Injectable } from '@nestjs/common';
import { SalesDTO, SalesStatus } from '../sales.dto';
import { SalesRepository } from './sales-repository';

@Injectable()
export class SalesRepositoryInMemory implements SalesRepository {
  findByAllFilters(_params: {
    idusers: number;
    idclients: number;
    date: string;
    period: { date1: string; date2: string };
  }): Promise<SalesDTO[]> {
    throw new Error('Method not implemented.');
  }
  sales: SalesDTO[] = [];

  async create(sales: SalesDTO): Promise<void> {
    sales.idsales = this.sales.length + 1;
    sales.createdAt = new Date().toISOString();
    sales.updatedAt = null;
    Promise.resolve(this.sales.push(sales));
  }

  async findByDate(idusers: number, date: string): Promise<any> {
    return this.sales.filter(
      (sale) => sale.idusers === idusers && sale.date === date,
    );
  }

  async findByPeriod(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<any> {
    return this.sales.filter((sale) => {
      if (
        sale.idusers === idusers &&
        sale.date >= date1 &&
        sale.date <= date2
      ) {
        return sale;
      }
    });
  }

  async findByClient(idusers: number, idclients: number): Promise<any> {
    return this.sales.filter(
      (sale) => sale.idusers === idusers && sale.idclients === idclients,
    );
  }

  async findOne(idusers: number, idsales: number): Promise<any> {
    return this.sales.find(
      (sale) => sale.idusers === idusers && sale.idsales === idsales,
    );
  }

  async findPending(idusers: number): Promise<SalesDTO[]> {
    return this.sales.filter(
      (sale) =>
        sale.idusers === idusers && sale.paymentStatus === SalesStatus.PENDING,
    );
  }

  async findPendingByClient(
    idusers: number,
    idclients: number,
  ): Promise<SalesDTO[]> {
    return this.sales.filter(
      (sale) =>
        sale.idusers === idusers &&
        sale.paymentStatus === SalesStatus.PENDING &&
        sale.idclients === idclients,
    );
  }

  getBasicInfoReports(
    _idusers: number,
    _date1: string,
    _date2: string,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getBiggestTotalWithRangeDate(
    _idusers: number,
    _date1: string,
    _date2: string,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getLowestTotalWithRangeDate(
    _idusers: number,
    _date1: string,
    _date2: string,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async delete(idusers: number, idsales: number): Promise<void> {
    const sale = this.sales.find(
      (sale) => sale.idusers === idusers && sale.idsales === idsales,
    );
    this.sales.splice(this.sales.indexOf(sale), 1);
  }

  async registerPayment(idusers: number, idsales: number): Promise<void> {
    const sale = this.sales.find(
      (sale) => sale.idusers === idusers && sale.idsales === idsales,
    );
    sale.paymentStatus = SalesStatus.PAID;
  }
}
