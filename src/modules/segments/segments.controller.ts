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
import { SegmentDTO } from './segment.dto';
import { SegmentService } from './segment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestType } from '../../types/request';
import { handleController } from '../../infra/http/handle-controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Segments')
@Controller('segments')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: RequestType, @Body() segment: SegmentDTO) {
    return handleController(async () => {
      const payload = segment;
      payload.idusers = req.user.idusers;
      await this.segmentService.create(payload);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Req() req: RequestType, @Body() segment: SegmentDTO) {
    return handleController(async () => {
      const payload = segment;
      segment.idusers = req.user.idusers;
      await this.segmentService.update(payload);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(@Req() req: RequestType) {
    return handleController(async () => {
      return await this.segmentService.find(req.user.idusers);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req: RequestType) {
    return handleController(async () => {
      const payload = {
        idsegments: Number(req.query.idsegments),
        idusers: req.user.idusers,
      };
      await this.segmentService.delete(payload);
    });
  }
}
