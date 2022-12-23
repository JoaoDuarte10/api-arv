import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { ClientDto } from '../client-dto';
import { UpdateClientService } from '../services/update';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestType } from '../../../types/request';
import { handleController } from '../../../infra/http/handle-controller';

@Controller('client')
export class UpdateClientController {
  constructor(private readonly service: UpdateClientService) {}

  @UseGuards(JwtAuthGuard)
  @Put()
  async handle(
    @Req() req: RequestType,
    @Body() body: ClientDto,
  ): Promise<void> {
    return handleController(async () => {
      const payload = {
        idusers: req.user.idusers,
        idclients: body.idclients,
        name: body.name,
        email: body.email,
        phone: body.phone,
        idsegment: body.idsegment,
        address: body.address,
        addressNumber: body.addressNumber,
        note: body.note,
      };
      await this.service.execute(payload);
    });
  }
}
