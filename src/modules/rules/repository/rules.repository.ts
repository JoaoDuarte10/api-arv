import { RulesDTO } from '../rules.dto';
export abstract class RulesRepository {
  abstract create(rule: { name: string; description: string }): Promise<void>;
  abstract disable(idrules: number): Promise<void>;
  abstract enable(idrules: number): Promise<void>;
  abstract findRuleById(idrules: number): Promise<RulesDTO>;
  abstract findRuleByName(name: string): Promise<RulesDTO>;
  abstract findAll(): Promise<RulesDTO[]>;
  abstract findByUser(idusers: number): Promise<RulesDTO[]>;
  abstract findRuleByUser(idusers: number, idrules: number): Promise<boolean>;
  abstract createWithUser(idusers: number, idrules: number): Promise<void>;
  abstract removeRuleWithUser(idusers: number, idrules: number): Promise<void>;
}
