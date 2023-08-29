/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { RulesDTO } from '../rules.dto';
import { RulesRepository } from './rules.repository';

@Injectable()
export class RulesRepositoryInMemory implements RulesRepository {
  rules: RulesDTO[] = [];
  clientsRules = [];

  async create(rule: RulesDTO): Promise<void> {
    rule.idrules = this.rules.length + 1;
    this.rules.push(rule);
  }

  async disable(idrules: number): Promise<void> {
    const rule = this.rules.find((rule) => rule.idrules === idrules);
    rule.has_active = false;
  }

  async findAll(): Promise<RulesDTO[]> {
    return this.rules;
  }

  async findByUser(idusers: number): Promise<RulesDTO[]> {
    return this.rules.filter((rule) => rule.idusers === idusers);
  }

  async createWithUser(idusers: number, idrules: number): Promise<void> {
    this.clientsRules.push({ idrules, idusers });
  }

  async findRuleByUser(_idusers: number, _idrules: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async findRuleById(_idrules: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async findRuleByName(_name: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async removeRuleWithUser(_idusers: number, _idrules: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async enable(_idrules: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
