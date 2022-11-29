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
    @Body() clientDto: ClientDto,
  ): Promise<void> {
    return handleController(async () => {
      const payload = {
        idusers: req.user.idusers,
        idclients: clientDto.idclients,
        name: clientDto.name,
        email: clientDto.email,
        phone: clientDto.phone,
        idsegment: clientDto.idsegment,
      };
      await this.service.execute(payload);
    });
  }
}
