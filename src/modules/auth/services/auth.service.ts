import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../users/repository/user-repository';
import { UserDto } from '../../users/user-dto';
import { RulesRepository } from '../../rules/repository/rules.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rulesRepository: RulesRepository,
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

  async login(user: UserDto): Promise<{ access_token: string }> {
    const rules = await this.rulesRepository.findByUser(user.idusers);
    const payload = {
      username: user.name,
      rules: rules.map((rule) => {
        return {
          idrules: rule.idrules,
          ruleName: rule.name,
        };
      }),
      sub: user.idusers,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
