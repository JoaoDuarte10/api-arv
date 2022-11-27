import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../users/repository/user-repository';
import { UserDto } from '../../users/user-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne(username);

    if (user && user.password === pass) {
      delete user.password;
      return user;
    }
    return null;
  }

  login(user: UserDto): { access_token: string } {
    const payload = { username: user.name, sub: user.idusers };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
