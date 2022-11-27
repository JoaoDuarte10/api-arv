import { Injectable } from '@nestjs/common';
import { SalesRepository } from './sales.repository';
import { SalesDTO } from './sales.dto';

@Injectable()
export class SalesService {
  constructor(private readonly salesRepository: SalesRepository) {}

  async create(sale: SalesDTO): Promise<void> {
    if (!sale.total) {
      throw new Error('Sales is Empty');
    }
    await this.salesRepository.create(sale);
  }

  async findByDate(idusers: number, date: string): Promise<SalesDTO> {
    return await this.salesRepository.findByDate(idusers, date);
  }

  async finByPeriod(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<SalesDTO> {
    return await this.salesRepository.finByPeriod(idusers, date1, date2);
  }

  async finByClient(idusers: number, idclients: number): Promise<any> {
    return await this.salesRepository.finByClient(idusers, idclients);
  }

  async delete(idusers: number, idsales: number): Promise<void> {
    await this.salesRepository.delete(idusers, idsales);
  }
}
