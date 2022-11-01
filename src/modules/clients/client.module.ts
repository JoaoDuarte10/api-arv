import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from '../middlewares/auth';
import { clientController } from './controller/index';
import { clientService } from './services/index';
import { ClientRepository } from './repository/client';

@Module({
  imports: [],
  controllers: [...clientController],
  providers: [...clientService, ClientRepository],
})
export class ClientModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
