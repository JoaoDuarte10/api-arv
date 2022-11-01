import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadEnvs } from './config/load-envs';
import { configProviders } from './providers/config-provider';
import { ClientModule } from './modules/clients/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadEnvs],
    }),
    ClientModule,
  ],
  controllers: [],
  providers: [...configProviders],
})
export class AppModule {}
