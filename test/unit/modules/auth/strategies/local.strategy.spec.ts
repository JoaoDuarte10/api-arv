import { LocalStrategy } from '../../../../../src/modules/auth/strategies/local.strategy';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  let sut: LocalStrategy;
  const authService = {
    validateUser: jest.fn(),
  };
  const user = { username: 'any_user', password: 'any_password' };

  beforeEach(() => {
    authService.validateUser.mockResolvedValueOnce(user);
    sut = new LocalStrategy(authService as any);
    user.username = 'any_user';
    user.password = 'any_password';
  });

  it('Should return user when credentials are valids', async () => {
    const result = await sut.validate(user.username, user.password);
    expect(result).toBeDefined();
  });

  it('Should return exception when credentials are invalids', async () => {
    authService.validateUser.mockReset();
    authService.validateUser.mockResolvedValueOnce(null);
    expect(sut.validate(user.username, user.password)).rejects.toThrowError(
      UnauthorizedException,
    );
  });
});
