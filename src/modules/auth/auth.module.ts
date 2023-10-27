import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthConfig } from './config';
import { configProviders } from '../../providers/config-provider';
import { dependenciesProviders } from '../../providers/dependencies-provider';
import { entities } from 'src/config/database-entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync(AuthConfig),
    TypeOrmModule.forFeature([...entities]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ...dependenciesProviders,
    ...configProviders,
  ],
  exports: [AuthService],
})
export class AuthModule {}
