import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestType } from '../../types/request';
import { SalesDTO } from './sales.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: RequestType, @Body() sale: SalesDTO) {
    try {
      const payload = sale;
      payload.idusers = req.user.idusers;
      await this.salesService.create(payload);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        {
          statusCode: error.getStatusCode(),
          details: error.getDetails(),
        },
        error.getStatusCode(),
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('date')
  async findByDate(@Req() req: RequestType) {
    const date = req.query.date;
    if (!date) {
      throw new HttpException('Date is invalid', HttpStatus.BAD_REQUEST);
    }
    return await this.salesService.findByDate(req.user.idusers, date);
  }

  @UseGuards(JwtAuthGuard)
  @Get('period')
  async finByPeriod(@Req() req: RequestType): Promise<any> {
    const date1 = req.query.date1;
    const date2 = req.query.date2;
    if (!date1 || !date2) {
      throw new HttpException('Date is invalid', HttpStatus.BAD_REQUEST);
    }
    return await this.salesService.finByPeriod(req.user.idusers, date1, date2);
  }

  @UseGuards(JwtAuthGuard)
  @Get('client')
  async finByClient(@Req() req: RequestType): Promise<any> {
    const idclients = req.query.idclients;
    if (!idclients) {
      throw new HttpException('Idclient is invalid', HttpStatus.BAD_REQUEST);
    }
    return await this.salesService.finByClient(req.user.idusers, idclients);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req: RequestType): Promise<void> {
    const idsales = Number(req.query.idsales);
    if (!idsales) {
      throw new HttpException('Idsales is invalid', HttpStatus.BAD_REQUEST);
    }
    await this.salesService.delete(req.user.idusers, idsales);
  }
}
