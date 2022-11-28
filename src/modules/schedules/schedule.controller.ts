import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestType } from '../../types/request';
import { ScheduleDTO } from './schedule-dto';
import { ScheduleService } from './schedule.service';
import { handleController } from '../../infra/http/handle-controller';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: RequestType,
    @Body() body: ScheduleDTO,
  ): Promise<void> {
    return handleController(async () => {
      const payload = {
        idusers: req.user.idusers,
        idclients: body.idclients,
        clientName: body.clientName,
        description: body.description,
        time: body.time,
        date: body.date,
        pacote: body.pacote,
        atendenceCount: body.atendenceCount,
        totalAtendenceCount: body.totalAtendenceCount,
        status: body.status,
      };
      await this.service.create(payload);
    });
  }
}
