import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../repository/client';

@Injectable()
export class DeleteClientService {
  constructor(private readonly repository: ClientRepository) {}

  async execute(idusers: number, idclients: number): Promise<void> {
    const clientAlreadExists = await this.repository.findBy(
      idusers,
      'idclients',
      idclients,
    );
    if (clientAlreadExists) throw new Error();
    await this.repository.delete(idusers, idclients);
  }
}
