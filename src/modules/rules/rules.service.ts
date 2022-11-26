import { Injectable } from '@nestjs/common';
import { RulesRepository } from './rules.repository';
import { RulesDTO } from './rules.dto';

@Injectable()
export class RulesService {
  constructor(private readonly rulesRepository: RulesRepository) {}

  async create(rule: RulesDTO): Promise<void> {
    await this.rulesRepository.create(rule);
  }

  async disable(idrules: number): Promise<void> {
    await this.rulesRepository.disable(idrules);
  }

  async findAll() {
    return await this.rulesRepository.findAll();
  }

  async findByUser(idusers: number) {
    return await this.rulesRepository.findByUser(idusers);
  }

  async createWithUser(idusers: number, idrules: number) {
    await this.rulesRepository.createWithUser(idusers, idrules);
  }
}
