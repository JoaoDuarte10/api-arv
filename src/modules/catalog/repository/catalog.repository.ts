import { CatalogInputDto } from '../catalog.dto';

export abstract class CatalogRepository {
  abstract create(params: CatalogInputDto): Promise<void>;
  abstract update(params: CatalogInputDto): Promise<void>;
  abstract getAll(idusers: number): Promise<CatalogInputDto[]>;
  abstract getOne(idusers: number, idcatalog: number): Promise<CatalogInputDto>;
  abstract delete(idusers: number, idcatalog: number): Promise<void>;
}
