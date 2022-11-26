import { ClientModule } from './clients/client.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RulesModule } from './rules/rule.module';

export const Modules = [ClientModule, UserModule, AuthModule, RulesModule];
