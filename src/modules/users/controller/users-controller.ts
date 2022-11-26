import {
  Body,
  Controller,
  Post,
  HttpException,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserDto } from '../user-dto';
import { UserService } from '../services/user-service';
import { ClientAlreadyExistsException } from '../exceptions/client-already-exists';
import { AuthService } from '../../auth/services/auth.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() userDto: UserDto): Promise<void> {
    try {
      await this.userService.create(userDto);
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: { Request: Request; user: UserDto }) {
    return this.authService.login(req.user);
  }
}
