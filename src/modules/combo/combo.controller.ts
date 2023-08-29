/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestType } from 'src/types/request';
import { handleController } from 'src/infra/http/handle-controller';
import { ComboInputDto } from './combo.dto';

@ApiTags('Combo')
@Controller('combo')
export class ComboController {
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: RequestType, @Body() params: ComboInputDto) {
    return handleController(async () => {});
  }
}
