import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ClientDto } from '../client-dto';
import { FindClientService } from '../services/find';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestType } from '../../../types/request';
import { handleController } from '../../../infra/http/handle-controller';

@Controller('client')
export class FindAllClientsController {
  constructor(private readonly service: FindClientService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async handle(@Req() req: RequestType): Promise<ClientDto[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      return await this.service.findAll(idusers);
    });
  }
}
