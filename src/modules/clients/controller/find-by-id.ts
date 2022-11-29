import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ClientDto } from '../client-dto';
import { FindClientService } from '../services/find';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestType } from '../../../types/request';
import { handleController } from '../../../infra/http/handle-controller';

@Controller('client')
export class FindClientByIdController {
  constructor(private readonly service: FindClientService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async handle(@Req() req: RequestType): Promise<ClientDto> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const idclients = parseInt(req.params.id.toString(), 10);
      return await this.service.find(idusers, idclients);
    });
  }
}
