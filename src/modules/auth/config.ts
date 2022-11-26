import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig, ConfigTypes } from '../../config/config';

export const AuthConfig: JwtModuleAsyncOptions = {
  useFactory(configService: ConfigService) {
    const jwtConfig = configService.get<JwtConfig>(ConfigTypes.jwtConfig);
    return {
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    };
  },
  inject: [ConfigService],
};
