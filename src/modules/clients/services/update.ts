import { Injectable } from '@nestjs/common';
import { ClientDto } from '../client-dto';
import { ClientRepository } from '../repository/client';

@Injectable()
export class UpdateClientService {
  constructor(private readonly repository: ClientRepository) {}

  async execute(client: ClientDto): Promise<void> {
    const clientAlreadExists = await this.repository.findBy(
      client.idusers,
      'idclients',
      client.idclients,
    );
    if (!clientAlreadExists) throw new Error();
    await this.repository.update({
      idusers: client.idusers,
      idclients: client.idclients,
      name: client.name,
      email: client.email,
      phone: client.phone,
      idsegments: client.idsegment,
    });
  }
}
