import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Put,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { SegmentDTO } from './segment.dto';
import { SegmentService } from './segment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestType } from '../../types/request';

@Controller('segments')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: RequestType, @Body() segment: SegmentDTO) {
    try {
      const payload = segment;
      payload.idusers = req.user.idusers;
      await this.segmentService.create(payload);
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
  @Put()
  async update(@Req() req: RequestType, @Body() segment: SegmentDTO) {
    try {
      const payload = segment;
      segment.idusers = req.user.idusers;
      await this.segmentService.update(payload);
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
  @Get()
  async find(@Req() req: RequestType) {
    return await this.segmentService.find(req.user.idusers);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(
    @Req() req: RequestType,
    @Body() segment: { idsegments: number },
  ) {
    try {
      const payload = {
        idsegments: segment.idsegments,
        idusers: req.user.idusers,
      };
      await this.segmentService.delete(payload);
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
}
