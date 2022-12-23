import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { UserDto } from '../user-dto';
import { UserService } from '../services/user-service';
import { AuthService } from '../../auth/services/auth.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { handleController } from 'src/infra/http/handle-controller';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() userDto: UserDto): Promise<void> {
    return handleController(async () => {
      await this.userService.create(userDto);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return handleController(async () => {
      return await this.userService.findAll();
    });
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req: { Request: Request; user: UserDto }) {
    return handleController(async () => {
      return this.authService.login(req.user);
    });
  }
}
