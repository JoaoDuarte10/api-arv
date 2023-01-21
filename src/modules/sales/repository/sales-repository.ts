import { SalesDTO } from '../sales.dto';

export abstract class SalesRepository {
  abstract create(sales: SalesDTO): Promise<void>;
  abstract findByDate(idusers: number, date: string): Promise<SalesDTO[]>;
  abstract findByPeriod(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<SalesDTO[]>;
  abstract findByClient(
    idusers: number,
    idclients: number,
  ): Promise<SalesDTO[]>;
  abstract findOne(idusers: number, idsales: number): Promise<SalesDTO>;
  abstract findPending(idusers: number): Promise<SalesDTO[]>;
  abstract findPendingByClient(
    idusers: number,
    idclients: number,
  ): Promise<SalesDTO[]>;
  abstract getBasicInfoReports(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<any>;
  abstract getBiggestTotalWithRangeDate(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<any>;
  abstract getLowestTotalWithRangeDate(
    idusers: number,
    date1: string,
    date2: string,
  ): Promise<any>;
  abstract delete(idusers: number, idsales: number): Promise<void>;
  abstract registerPayment(idusers: number, idsales: number): Promise<void>;
}
