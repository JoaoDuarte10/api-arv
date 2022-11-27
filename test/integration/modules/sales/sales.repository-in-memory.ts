import { Injectable } from '@nestjs/common';
import { SalesDTO, SalesStatus } from '../../../../src/modules/sales/sales.dto';

@Injectable()
export class SalesRepositoryInMemory {
  sales: SalesDTO[] = [];

  async create(sales: SalesDTO): Promise<void> {
    sales.idsales = this.sales.length + 1;
    sales.created_at = new Date().toISOString();
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
