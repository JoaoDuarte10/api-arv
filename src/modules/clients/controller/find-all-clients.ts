import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ClientDto } from '../client-dto';
import { FindClientService } from '../services/find';

@Controller('client')
export class FindAllClientsController {
  constructor(private readonly service: FindClientService) {}

  @Get('all')
  async handle(@Req() req: Request): Promise<ClientDto[]> {
    const idusers = parseInt(req.headers['id-user'].toString(), 10);
    return await this.service.findAll(idusers);
  }
}
