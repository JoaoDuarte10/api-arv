import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadEnvs } from './config/load-envs';
import { configProviders } from './providers/config-provider';
import { ClientModule } from './modules/clients/client.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadEnvs],
    }),
    // ClientModule,
    UserModule,
  ],
  controllers: [],
  providers: [...configProviders],
})
export class AppModule {}
