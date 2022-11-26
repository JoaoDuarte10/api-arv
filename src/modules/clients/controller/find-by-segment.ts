import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ClientDto } from '../client-dto';
import { FindClientService } from '../services/find';

@Controller('client')
export class FindClientBySegmentController {
  constructor(private readonly service: FindClientService) {}

  @Get('segment')
  async handle(@Req() req: Request): Promise<ClientDto[]> {
    const idusers = Number(req.headers['id-user']);
    const idsegments = parseInt(req.query.segment.toString(), 10);
    return await this.service.findBySegment(idusers, idsegments);
  }
}
