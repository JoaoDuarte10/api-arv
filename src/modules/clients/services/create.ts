import { Injectable } from '@nestjs/common';
import { ClientDto } from '../client-dto';
import { ClientRepository } from '../repository/client';

@Injectable()
export class CreateClientService {
  constructor(private readonly repository: ClientRepository) {}

  async execute(client: ClientDto): Promise<void> {
    const clientAlreadExists = await this.repository.findBy(
      client.idusers,
      'name',
      client.name,
    );
    if (clientAlreadExists) throw new Error();
    await this.repository.create({
      idusers: client.idusers,
      name: client.name,
      email: client.email,
      phone: client.phone,
      idsegments: client.idsegment,
    });
  }
}
