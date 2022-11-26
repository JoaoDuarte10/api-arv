import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { ClientDto } from '../client-dto';
import { UpdateClientService } from '../services/update';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestType } from '../../../types/request';

@Controller('client')
export class UpdateClientController {
  constructor(private readonly service: UpdateClientService) {}

  @UseGuards(JwtAuthGuard)
  @Put()
  async handle(
    @Req() req: RequestType,
    @Body() clientDto: ClientDto,
  ): Promise<void> {
    clientDto.idusers = req.user.idusers;
    await this.service.execute(clientDto);
  }
}
