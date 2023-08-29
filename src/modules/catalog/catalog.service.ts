import { Injectable } from '@nestjs/common';
import { CatalogInputDto } from './catalog.dto';
import { CatalogRepository } from './repository/catalog.repository';

@Injectable()
export class CatalogService {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async create(params: CatalogInputDto): Promise<void> {
    await this.catalogRepository.create(params);
  }

  async update(params: CatalogInputDto): Promise<void> {
    await this.catalogRepository.update(params);
  }

  async delete(idusers: number, idcatalog: number): Promise<void> {
    await this.catalogRepository.delete(idusers, idcatalog);
  }

  async findOneById(
    idusers: number,
    idcatalog: number,
  ): Promise<CatalogInputDto> {
    return this.catalogRepository.getOne(idusers, idcatalog);
  }

  async findAll(idusers: number): Promise<CatalogInputDto[]> {
    return this.catalogRepository.getAll(idusers);
  }
}
