import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ClientDto } from '../client-dto';
import { FindClientService } from '../services/find';

@Controller('client')
export class FindClientByIdController {
  constructor(private readonly service: FindClientService) {}

  @Get(':id')
  async handle(@Req() req: Request): Promise<ClientDto> {
    const idusers = parseInt(req.headers['id-user'].toString(), 10);
    const idclients = parseInt(req.params.id.toString(), 10);
    return await this.service.find(idusers, idclients);
  }
}
