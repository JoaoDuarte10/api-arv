export abstract class RulesRepository {
  abstract create(rule: { name: string; description: string }): Promise<void>;
  abstract disable(idrules: number): Promise<void>;
  abstract enable(idrules: number): Promise<void>;
  abstract findRuleById(idrules: number): Promise<any>;
  abstract findRuleByName(name: string): Promise<any>;
  abstract findAll(): Promise<any>;
  abstract findByUser(idusers: number): Promise<any>;
  abstract findRuleByUser(idusers: number, idrules: number): Promise<boolean>;
  abstract createWithUser(idusers: number, idrules: number): Promise<void>;
  abstract removeRuleWithUser(idusers: number, idrules: number): Promise<void>;
}
