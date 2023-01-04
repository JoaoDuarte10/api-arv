import { Injectable } from '@nestjs/common';
import { ClientDto } from '../client-dto';
import { ClientRepository } from '../repository/client';
import { ClientNotExistsException } from '../exceptions/client-not-exists';

@Injectable()
export class UpdateClientService {
  constructor(private readonly repository: ClientRepository) {}

  async execute(client: ClientDto): Promise<void> {
    const clientExists = await this.repository.findBy(
      client.idusers,
      'idclients',
      client.idclients,
    );
    if (!clientExists.length)
      throw new ClientNotExistsException('Client not exists');
    await this.repository.update({
      idusers: client.idusers,
      idclients: client.idclients,
      name: client.name,
      email: client.email,
      phone: client.phone,
      idsegment: client.idsegment,
      address: client.address,
      addressNumber: client.addressNumber,
      note: client.note,
    });
  }
}
