import { ClientModule } from './clients/client.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RulesModule } from './rules/rule.module';
import { SegmentModule } from './segments/segent.module';
import { SalesModule } from './sales/sales.module';
import { ScheduleModule } from './schedules/schedule.module';
import { OutgoingModule } from './outgoing/outgoing.module';

export const Modules = [
  ClientModule,
  UserModule,
  AuthModule,
  RulesModule,
  SegmentModule,
  SalesModule,
  ScheduleModule,
  OutgoingModule,
];
