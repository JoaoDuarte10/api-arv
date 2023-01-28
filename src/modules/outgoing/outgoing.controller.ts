import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OutgoingDTO, OutgoingInstallmentTranslated } from './outgoing.dto';
import { RequestType } from '../../types/request';
import { OutgoingService } from './outgoing.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { handleController } from '../../infra/http/handle-controller';
import { InvalidParamsRequestException } from '../../exceptions/invalid-params-request';
import { PaymentMethodTypeTranslated } from '../../types/payment';

@ApiTags('Outgoing')
@Controller('outgoing')
export class OutgoingController {
  constructor(private readonly outgoingService: OutgoingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: RequestType,
    @Body() outgoing: OutgoingDTO,
  ): Promise<void> {
    return handleController(async () => {
      const payload: OutgoingDTO = {
        idusers: req.user.idusers,
        description: outgoing.description,
        date: outgoing.date,
        total: outgoing.total,
        paymentMethod: outgoing.paymentMethod,
        installment: outgoing.installment,
      };
      if (!payload.idusers) {
        throw new InvalidParamsRequestException('Idusers is invalid');
      }
      await this.outgoingService.create(payload);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('payment-enums')
  getPaymentMethodEnums(): PaymentMethodTypeTranslated {
    return this.outgoingService.getPaymentMethodEnums();
  }

  @UseGuards(JwtAuthGuard)
  @Get('installment-enums')
  getInstallmentEnums(): OutgoingInstallmentTranslated {
    return this.outgoingService.getInstallmentEnums();
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(@Request() req: RequestType): Promise<OutgoingDTO[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      if (!idusers) {
        throw new InvalidParamsRequestException('Idusers is invalid');
      }
      return await this.outgoingService.getAll(idusers);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('date')
  async getByDate(@Request() req: RequestType): Promise<OutgoingDTO[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      if (!idusers) {
        throw new InvalidParamsRequestException('Idusers is invalid');
      }
      const date = req.query.date;
      if (!date) {
        throw new InvalidParamsRequestException('Date is invalid');
      }
      return await this.outgoingService.getByDate(idusers, date);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('period')
  async getByPeriod(@Request() req: RequestType): Promise<OutgoingDTO[]> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      if (!idusers) {
        throw new InvalidParamsRequestException('Idusers is invalid');
      }
      const date1 = req.query.date1;
      const date2 = req.query.date2;
      if ((!date1 && !date2) || !date1 || !date2) {
        throw new InvalidParamsRequestException('Period is invalid');
      }
      return await this.outgoingService.getByPeriod(idusers, date1, date2);
    });
  }
}
