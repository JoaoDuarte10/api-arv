import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestType } from '../../types/request';
import { ScheduleDTO } from './schedule-dto';
import { ScheduleService } from './schedule.service';
import { handleController } from '../../infra/http/handle-controller';
import { InvalidParamsRequestException } from '../../exceptions/invalid-params-request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Schedules')
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
  @Put()
  async update(
    @Req() req: RequestType,
    @Body() body: ScheduleDTO,
  ): Promise<void> {
    return handleController(async () => {
      const payload = {
        idschedules: body.idschedules,
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
      if (!payload.idschedules) {
        throw new InvalidParamsRequestException('Idschedules is invalid');
      }
      await this.service.update(payload);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('date')
  async findByDate(@Req() req: RequestType): Promise<ScheduleDTO[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const date = req.query.date;
      if (!date) {
        throw new InvalidParamsRequestException('Date is invalid');
      }
      return await this.service.findByDate(idusers, date);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('client')
  async findByIdClient(@Req() req: RequestType): Promise<ScheduleDTO[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const idclients = req.query.idclients;
      if (!idclients) {
        throw new InvalidParamsRequestException('Idclients is invalid');
      }
      return await this.service.findByIdClient(idusers, idclients);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('client/name')
  async findByClientName(@Req() req: RequestType): Promise<ScheduleDTO[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const clientName = req.query.clientName;
      if (!clientName) {
        throw new InvalidParamsRequestException('Client name is invalid');
      }
      return await this.service.findByClientName(idusers, clientName);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('expireds')
  async findAllExpireds(@Req() req: RequestType): Promise<ScheduleDTO[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      return await this.service.findAllExpireds(idusers);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Req() req: RequestType): Promise<ScheduleDTO[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const id = req.params.id;
      return await this.service.findById(idusers, id);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req: RequestType): Promise<void> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const idschedules = req.query.idschedules;
      if (!idschedules) {
        throw new InvalidParamsRequestException('Idschedules is invalid');
      }
      return await this.service.delete(idusers, idschedules);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('finish')
  async finish(@Req() req: RequestType): Promise<void> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const idschedules = req.body.idschedules;
      if (!idschedules) {
        throw new InvalidParamsRequestException('Idschedules is invalid');
      }
      return await this.service.finish(idusers, idschedules);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('finished')
  async getAllFinished(@Req() req: RequestType): Promise<ScheduleDTO[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      return await this.service.getAllFinished(idusers);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('finished/from-date')
  async getMostRecentFrom(@Req() req: RequestType): Promise<ScheduleDTO[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const fromDate = req.query.fromDate;
      if (!fromDate) {
        throw new InvalidParamsRequestException('From date is invalid');
      }
      return await this.service.getMostRecentFrom(idusers, fromDate);
    });
  }
}
