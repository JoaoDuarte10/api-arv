import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { UserDto } from '../user-dto';
import { UserService } from '../services/user-service';
import { ClientAlreadyExistsException } from '../exceptions/client-already-exists';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userDto: UserDto): Promise<void> {
    try {
      await this.userService.create(userDto);
    } catch (error) {
      if (error instanceof ClientAlreadyExistsException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
    }
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}
