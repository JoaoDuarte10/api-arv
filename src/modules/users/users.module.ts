import { Module } from '@nestjs/common';
import { UsersController } from './controller/users-controller';
import { UserService } from './services/user-service';
import { UserRepository } from './repository/user-repository';
import { configProviders } from '../../providers/config-provider';

@Module({
  controllers: [UsersController],
  providers: [UserService, UserRepository, ...configProviders],
})
export class UserModule {}
