import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RulesService } from '../rules.service';
import { RulesDTO } from '../rules.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestType } from '../../../types/request';

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: RulesDTO): Promise<void> {
    await this.rulesService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('disable')
  async disable(idrules: number): Promise<void> {
    await this.rulesService.disable(idrules);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return await this.rulesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findByUser(@Req() req: RequestType) {
    return await this.rulesService.findByUser(req.user.idusers);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user')
  async createWithUser(@Req() req: RequestType, @Body() body: any) {
    await this.rulesService.createWithUser(req.user.idusers, body.idrules);
  }
}
