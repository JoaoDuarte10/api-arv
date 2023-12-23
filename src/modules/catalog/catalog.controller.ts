import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { handleController } from 'src/infra/http/handle-controller';
import { CatalogInputDto } from './catalog.dto';
import { RequestType } from 'src/types/request';
import { InvalidParamsRequestException } from 'src/exceptions/invalid-params-request';
import { CatalogService } from './catalog.service';

@ApiTags('Catalog')
@Controller({
  path: 'catalogs',
  scope: Scope.REQUEST,
})
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Request() req: RequestType,
    @Body() params: CatalogInputDto,
  ): Promise<void> {
    return handleController(async () => {
      const date = new Date(params.duration);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

      const payload: CatalogInputDto = {
        idUsers: req.user.idusers,
        description: params.description,
        name: params.name,
        price: params.price,
        duration: params.duration
          ? `${date.getUTCHours()}:${date.getMinutes()}`
          : null,
      };

      if (!payload.idUsers) {
        throw new InvalidParamsRequestException('Idusers is invalid');
      }

      return this.catalogService.create(payload);
    });
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  update(
    @Request() req: RequestType,
    @Body() params: CatalogInputDto,
  ): Promise<void> {
    return handleController(async () => {
      const date = new Date(params.duration);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

      const payload: CatalogInputDto = {
        idUsers: req.user.idusers,
        description: params.description,
        name: params.name,
        price: params.price,
        idCatalog: params.idCatalog,
        duration: params.duration
          ? `${date.getUTCHours()}:${date.getMinutes()}`
          : null,
      };

      if (!payload.idUsers) {
        throw new InvalidParamsRequestException('Idusers is invalid');
      }

      return this.catalogService.update(payload);
    });
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(@Request() req: RequestType): Promise<void> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const id = Number(req.query.id);

      if (!idusers) {
        throw new InvalidParamsRequestException('Idusers is invalid');
      }

      return this.catalogService.delete(idusers, id);
    });
  }

  @Get('list-all')
  @UseGuards(JwtAuthGuard)
  getAll(@Request() req: RequestType): Promise<void> {
    return handleController(async () => {
      const idusers = req.user.idusers;

      return await this.catalogService.findAll(idusers);
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Request() req: RequestType): Promise<void> {
    return handleController(async () => {
      const idusers = req.user.idusers;
      const id = Number(req.params.id);

      return this.catalogService.findOneById(idusers, id);
    });
  }
}
