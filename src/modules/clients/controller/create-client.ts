import { Body, Controller, Post, Req, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { ClientDto } from '../client-dto';
import { CreateClientService } from '../services/create';
import { ClientAlreadyExistsException } from '../exceptions/client-already-exists';

@Controller('client')
export class CreateClientController {
  constructor(private readonly service: CreateClientService) {}

  @Post()
  async handle(
    @Req() req: Request,
    @Body() clientDto: ClientDto,
  ): Promise<void> {
    try {
      const idusers = Number(req.headers['id-user']);
      clientDto.idusers = idusers;
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
