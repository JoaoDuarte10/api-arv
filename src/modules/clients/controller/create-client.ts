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
    const idusers = Number(req.headers['id-user']);
    clientDto.idusers = idusers;
    await this.service.execute(clientDto);
  }
}
