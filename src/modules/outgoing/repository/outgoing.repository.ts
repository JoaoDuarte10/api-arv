import { OutgoingDTO } from '../outgoing.dto';

export abstract class OutgoingRepository {
  abstract create(params: OutgoingDTO): Promise<void>;
  abstract getAll(idusers: number): Promise<OutgoingDTO[]>;
  abstract getByDate(idusers: number, date: Date): Promise<OutgoingDTO[]>;
  abstract getByPeriod(
    idusers: number,
    date1: Date,
    date2: Date,
  ): Promise<OutgoingDTO[]>;
}
