import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ClientDto } from '../client-dto';
import { CreateClientService } from '../services/create';

@Controller('client')
export class CreateClientController {
  constructor(private readonly service: CreateClientService) {}

  @Post()
  async handle(
    @Req() req: Request,
    @Body() clientDto: ClientDto,
  ): Promise<void> {
    const idusers = parseInt(req.headers['id-user'].toString(), 10);
    clientDto.idusers = idusers;
    await this.service.execute(clientDto);
  }
}
