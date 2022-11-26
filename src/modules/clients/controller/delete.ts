import { Controller, Delete, Req, UseGuards } from '@nestjs/common';
import { DeleteClientService } from '../services/delete';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestType } from '../../../types/request';

@Controller('client')
export class DeleteClientController {
  constructor(private readonly service: DeleteClientService) {}

  @UseGuards(JwtAuthGuard)
  @Delete()
  async handle(@Req() req: RequestType): Promise<void> {
    const idusers = req.user.idusers;
    const idclients = parseInt(req.query.id.toString(), 10);
    await this.service.execute(idusers, idclients);
  }
}
