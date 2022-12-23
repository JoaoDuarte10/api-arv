import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RulesService } from '../rules.service';
import { RulesDTO } from '../rules.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestType } from '../../../types/request';
import { InvalidParamsRequestException } from '../../../exceptions/invalid-params-request';

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: RulesDTO): Promise<void> {
    if (!body.name || !body.description) {
      throw new InvalidParamsRequestException('Params invalids');
    }
    const payload = {
      name: body.name,
      description: body.description,
    };
    await this.rulesService.create(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('disable')
  async disable(@Body() body: { idrules: number }): Promise<void> {
    const idrules = body.idrules;
    if (!idrules) {
      throw new InvalidParamsRequestException('Idrules is not provided');
    }
    await this.rulesService.disable(idrules);
  }

  @UseGuards(JwtAuthGuard)
  @Post('enable')
  async enable(@Body() body: { idrules: number }): Promise<void> {
    const idrules = body.idrules;
    if (!idrules) {
      throw new InvalidParamsRequestException('Idrules is not provided');
    }
    await this.rulesService.enable(idrules);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return await this.rulesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async findByUser(@Req() req: RequestType) {
    return await this.rulesService.findByUser(req.user.idusers);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user')
  async createWithUser(@Req() req: RequestType, @Body() body: any) {
    await this.rulesService.createWithUser(req.user.idusers, body.idrules);
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-rule-with-user')
  async removeRuleWithUser(
    @Req() req: RequestType,
    @Body() body: { idrules: number },
  ) {
    await this.rulesService.removeRuleWithUser(req.user.idusers, body.idrules);
  }
}
