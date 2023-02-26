import { Injectable } from '@nestjs/common';
import { ClientDto } from '../client-dto';
import { ClientRepository } from '../repository/client';

@Injectable()
export class FindClientService {
  constructor(private readonly repository: ClientRepository) {}

  async find(iduser: number, idclients: number): Promise<ClientDto> {
    const client = await this.repository.findBy(iduser, 'idclients', idclients);
    return client[0];
  }

  async findBySegment(
    iduser: number,
    idsegments: number,
  ): Promise<ClientDto[]> {
    return await this.repository.findBy(iduser, 'idsegments', idsegments);
  }

  async findAll(iduser: number): Promise<ClientDto[]> {
    return await this.repository.find(iduser);
  }
}
