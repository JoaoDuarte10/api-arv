import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestType } from '../../types/request';
import { ScheduleDTO } from './schedule-dto';
import { ScheduleService } from './schedule.service';
import { handleController } from '../../infra/http/handle-controller';
import { InvalidParamsRequestException } from '../../exceptions/invalid-params-request';

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

  @UseGuards(JwtAuthGuard)
  @Get('date')
  async findByDate(@Req() req: RequestType): Promise<ScheduleDTO[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const date = req.query.date;
      return await this.service.findByDate(idusers, date);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('client')
  async findByClient(@Req() req: RequestType): Promise<ScheduleDTO[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const idclients = req.query.idclients;
      if (!idclients) {
        throw new InvalidParamsRequestException('Idclients is invalid');
      }
      return await this.service.findByClient(idusers, idclients);
    });
  }
}
