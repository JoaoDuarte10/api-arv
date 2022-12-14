import { UserRepository } from '../../../../../src/modules/users/repository/user-repository';
import { UserDto } from '../../../../../src/modules/users/user-dto';
import { AuthService } from '../../../../../src/modules/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RulesRepository } from '../../../../../src/modules/rules/repository/rules.repository';

describe('AuthService', () => {
  let sut: AuthService;
  let userRepository: UserRepository;
  let rulesRepository: RulesRepository;
  let jwtService: JwtService;
  let user: UserDto;

  beforeEach(async () => {
    user = {
      idusers: 1,
      name: 'any_name',
      password: 'any_password',
      phone: 'any_phone',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    userRepository = {
      findOne: (): UserDto => {
        return user;
      },
    } as any;

    jwtService = {
      sign: () => user,
    } as any;

    rulesRepository = {
      findByUser: () => [{ idrules: 1, name: 'any_rule' }],
    } as any;

    sut = new AuthService(userRepository, rulesRepository, jwtService);
  });

  it('should return user when credentials are valid', async () => {
    const result = await sut.validateUser(user.name, user.password);
    expect(result).toStrictEqual(user);
  });

  it('should return null when credentials are invalid', async () => {
    const result = await sut.validateUser(user.name, 'any');
    expect(result).toBeNull();
  });

  it('should not return password when credentials are valid', async () => {
    const result = await sut.validateUser(user.name, 'any');
    const obj = new Object(result);
    expect(obj.hasOwnProperty('password')).toBeFalsy();
  });

  it('Should return access token', async () => {
    const result = await sut.login(user);
    expect(result.access_token).toBeDefined();
  });
});
