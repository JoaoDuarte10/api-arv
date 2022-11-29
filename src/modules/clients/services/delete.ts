import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../repository/client';
import { ClientNotExistsException } from '../exceptions/client-not-exists';

@Injectable()
export class DeleteClientService {
  constructor(private readonly repository: ClientRepository) {}

  async execute(idusers: number, idclients: number): Promise<void> {
    const clientExists = await this.repository.findBy(
      idusers,
      'idclients',
      idclients,
    );
    if (!clientExists.length)
      throw new ClientNotExistsException('Client not exists');
    await this.repository.delete(idusers, idclients);
  }
}
