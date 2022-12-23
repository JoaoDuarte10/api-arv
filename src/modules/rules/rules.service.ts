import { Injectable } from '@nestjs/common';
import { RulesRepository } from './repository/rules.repository';
import { RuleAlreadyExistsWithUser } from './exceptions/rule-already-exists-with-user';
import { RuleNotExists } from './exceptions/rule-not-exists';
import { RuleAlreadyExists } from './exceptions/rule-already-exists';

@Injectable()
export class RulesService {
  constructor(private readonly rulesRepository: RulesRepository) {}

  async create(rule: { name: string; description: string }): Promise<void> {
    const existsRule = this.rulesRepository.findRuleByName(rule.name);
    if (existsRule) {
      throw new RuleAlreadyExists('This rule already exists');
    }
    await this.rulesRepository.create(rule);
  }

  async disable(idrules: number): Promise<void> {
    const existsRule = this.rulesRepository.findRuleById(idrules);
    if (!existsRule) {
      throw new RuleNotExists('This rule not exists');
    }
    await this.rulesRepository.disable(idrules);
  }

  async enable(idrules: number): Promise<void> {
    const existsRule = this.rulesRepository.findRuleById(idrules);
    if (!existsRule) {
      throw new RuleNotExists('This rule not exists');
    }
    await this.rulesRepository.enable(idrules);
  }

  async findAll() {
    return await this.rulesRepository.findAll();
  }

  async findByUser(idusers: number) {
    return await this.rulesRepository.findByUser(idusers);
  }

  async createWithUser(idusers: number, idrules: number) {
    const existsRule = this.rulesRepository.findRuleById(idrules);
    if (!existsRule) {
      throw new RuleNotExists('This rule not exists');
    }

    const alreadyExists = await this.rulesRepository.findRuleByUser(
      idusers,
      idrules,
    );
    if (alreadyExists) {
      throw new RuleAlreadyExistsWithUser(
        'This rule already exists with this user',
      );
    }
    await this.rulesRepository.createWithUser(idusers, idrules);
  }

  async removeRuleWithUser(idusers: number, idrules: number) {
    await this.rulesRepository.removeRuleWithUser(idusers, idrules);
  }
}
