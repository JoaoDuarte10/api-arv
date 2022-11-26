import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './controller/users-controller';
import { UserService } from './services/user-service';
import { UserRepository } from './repository/user-repository';
import { configProviders } from '../../providers/config-provider';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UserService, UserRepository, ...configProviders],
  exports: [UserRepository],
})
export class UserModule {}
