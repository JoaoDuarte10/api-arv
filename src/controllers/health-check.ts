import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller('health-check')
export class HealthCheckController {
  @Get()
  handle() {
    return 'ok';
  }
}
