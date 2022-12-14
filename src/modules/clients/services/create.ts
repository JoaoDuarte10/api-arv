import { Injectable } from '@nestjs/common';
import { ClientDto } from '../client-dto';
import { ClientRepository } from '../repository/client';
import { ClientAlreadyExistsException } from '../exceptions/client-already-exists';

@Injectable()
export class CreateClientService {
  constructor(private readonly repository: ClientRepository) {}

  async execute(client: ClientDto): Promise<void> {
    const clientAlreadExists = await this.repository.findBy(
      client.idusers,
      'name',
      client.name,
    );
    if (clientAlreadExists.length)
      throw new ClientAlreadyExistsException('Client alread exists');
    await this.repository.create(client);
  }
}
