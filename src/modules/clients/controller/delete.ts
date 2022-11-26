import { Controller, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { DeleteClientService } from '../services/delete';

@Controller('client')
export class DeleteClientController {
  constructor(private readonly service: DeleteClientService) {}

  @Delete()
  async handle(@Req() req: Request): Promise<void> {
    const idusers = Number(req.headers['id-user']);
    const idclients = parseInt(req.query.id.toString(), 10);
    await this.service.execute(idusers, idclients);
  }
}