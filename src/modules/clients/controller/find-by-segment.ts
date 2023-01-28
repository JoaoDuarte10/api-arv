import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ClientDto } from '../client-dto';
import { FindClientService } from '../services/find';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestType } from '../../../types/request';
import { handleController } from '../../../infra/http/handle-controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Client')
@Controller('client')
export class FindClientBySegmentController {
  constructor(private readonly service: FindClientService) {}

  @UseGuards(JwtAuthGuard)
  @Get('segment')
  async handle(@Req() req: RequestType): Promise<ClientDto[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const idsegments = parseInt(req.query.segment.toString(), 10);
      return await this.service.findBySegment(idusers, idsegments);
    });
  }
}
