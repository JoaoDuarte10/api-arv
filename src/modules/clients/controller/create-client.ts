import {
  Body,
  Controller,
  Post,
  Req,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ClientDto } from '../client-dto';
import { CreateClientService } from '../services/create';
import { ClientAlreadyExistsException } from '../exceptions/client-already-exists';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestType } from '../../../types/request';

@Controller('client')
export class CreateClientController {
  constructor(private readonly service: CreateClientService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async handle(
    @Req() req: RequestType,
    @Body() clientDto: ClientDto,
  ): Promise<void> {
    try {
      clientDto.idusers = req.user.idusers;
      await this.service.execute(clientDto);
    } catch (error) {
      if (error instanceof ClientAlreadyExistsException) {
        throw new HttpException(
          {
            statusCode: error.getStatusCode(),
            details: error.getDetails(),
          },
          error.getStatusCode(),
        );
      }
    }
  }
}
