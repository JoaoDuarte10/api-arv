import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestType } from '../../types/request';
import { SalesDTO } from './sales.dto';
import { handleController } from '../../infra/http/handle-controller';
import { InvalidParamsRequestException } from '../../exceptions/invalid-params-request';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: RequestType, @Body() sale: SalesDTO): Promise<void> {
    return handleController(async () => {
      const payload = {
        idusers: req.user.idusers,
        idclients: sale.idclients,
        description: sale.description,
        date: sale.date,
        total: sale.total,
        paymentStatus: sale.paymentStatus,
        paymentDate: sale.paymentDate,
      };
      await this.salesService.create(payload);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('date')
  async findByDate(@Req() req: RequestType): Promise<SalesDTO[]> {
    return handleController(async () => {
      const date = req.query.date;
      if (!date) {
        throw new InvalidParamsRequestException('Date is invalid');
      }
      return await this.salesService.findByDate(req.user.idusers, date);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('period')
  async findByPeriod(@Req() req: RequestType): Promise<SalesDTO[]> {
    return handleController(async () => {
      const date1 = req.query.date1;
      const date2 = req.query.date2;
      if (!date1 || !date2) {
        throw new InvalidParamsRequestException('The range date is invalid');
      }
      return await this.salesService.findByPeriod(
        req.user.idusers,
        date1,
        date2,
      );
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('client')
  async findByClient(@Req() req: RequestType): Promise<SalesDTO[]> {
    return handleController(async () => {
      const idclients = req.query.idclients;
      if (!idclients) {
        throw new InvalidParamsRequestException('Idclient is invalid');
      }
      return await this.salesService.findByClient(req.user.idusers, idclients);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('pending')
  async findPending(@Req() req: RequestType): Promise<SalesDTO[]> {
    return handleController(async () => {
      return await this.salesService.findPending(req.user.idusers);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req: RequestType): Promise<void> {
    return handleController(async () => {
      const idsales = Number(req.query.idsales);
      if (!idsales) {
        throw new InvalidParamsRequestException('Idsales is invalid');
      }
      await this.salesService.delete(req.user.idusers, idsales);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('register-payment')
  async registerPayment(@Req() req: RequestType): Promise<void> {
    return handleController(async () => {
      const idsales = Number(req.body.idsales);
      if (!idsales) {
        throw new InvalidParamsRequestException('Idsales is invalid');
      }
      await this.salesService.registerPayment(req.user.idusers, idsales);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('reports')
  async reports(@Req() req: RequestType): Promise<void> {
    return handleController(async () => {
      const date1 = req.query.date1;
      const date2 = req.query.date2;
      if (!date1 || !date2) {
        throw new InvalidParamsRequestException('The range date is invalid');
      }
      return await this.salesService.findReports(
        req.user.idusers,
        date1,
        date2,
      );
    });
  }
}
