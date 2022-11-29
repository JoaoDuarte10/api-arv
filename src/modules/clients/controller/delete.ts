import { Controller, Delete, Req, UseGuards } from '@nestjs/common';
import { DeleteClientService } from '../services/delete';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestType } from '../../../types/request';
import { handleController } from '../../../infra/http/handle-controller';

@Controller('client')
export class DeleteClientController {
  constructor(private readonly service: DeleteClientService) {}

  @UseGuards(JwtAuthGuard)
  @Delete()
  async handle(@Req() req: RequestType): Promise<void> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const idclients = req.query.idclients;
      await this.service.execute(idusers, idclients);
    });
  }
}
