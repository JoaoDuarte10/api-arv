import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ClientDto } from '../client-dto';
import { FindClientService } from '../services/find';

@Controller('client')
export class FindAllClientsController {
  constructor(private readonly service: FindClientService) {}

  @Get('all')
  async handle(@Req() req: Request): Promise<ClientDto[]> {
    const idusers = Number(req.headers['id-user']);
    return await this.service.findAll(idusers);
  }
}
