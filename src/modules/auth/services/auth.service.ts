import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../users/repository/user-repository';
import { UserDto } from '../../users/user-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { username: user.name, sub: user.idusers };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
