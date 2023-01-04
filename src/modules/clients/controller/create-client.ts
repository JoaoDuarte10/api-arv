import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ClientDto } from '../client-dto';
import { CreateClientService } from '../services/create';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestType } from '../../../types/request';
import { handleController } from '../../../infra/http/handle-controller';

@Controller('client')
export class CreateClientController {
  constructor(private readonly service: CreateClientService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async handle(
    @Req() req: RequestType,
    @Body() body: ClientDto,
  ): Promise<void> {
    return handleController(async () => {
      const payload = {
        idusers: req.user.idusers,
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
