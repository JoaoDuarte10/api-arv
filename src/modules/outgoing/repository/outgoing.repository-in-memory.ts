import { OutgoingDTO } from '../outgoing.dto';
import { OutgoingRepository } from './outgoing.repository';

export class OutgoingRepositoryInMemory implements OutgoingRepository {
  outgoings: OutgoingDTO[] = [];

  async create(params: OutgoingDTO): Promise<void> {
    this.outgoings.push(params);
  }

  async getAll(idusers: number): Promise<OutgoingDTO[]> {
    return this.outgoings.filter((outgoing) => outgoing.idusers === idusers);
  }

  async getByDate(idusers: number, date: Date): Promise<OutgoingDTO[]> {
    return this.outgoings.filter(
      (outgoing) => outgoing.idusers === idusers && outgoing.date === date,
    );
  }
  async getByPeriod(
    idusers: number,
    date1: Date,
    date2: Date,
  ): Promise<OutgoingDTO[]> {
    return this.outgoings.filter(
      (outgoing) =>
        outgoing.idusers === idusers &&
        outgoing.date >= date1 &&
        outgoing.date <= date2,
    );
  }
}
