import { Body, Controller, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { ClientDto } from '../client-dto';
import { UpdateClientService } from '../services/update';

@Controller('client')
export class UpdateClientController {
  constructor(private readonly service: UpdateClientService) {}

  @Put()
  async handle(
    @Req() req: Request,
    @Body() clientDto: ClientDto,
  ): Promise<void> {
    const idusers = Number(req.headers['id-user']);
    clientDto.idusers = idusers;
    await this.service.execute(clientDto);
  }
}
