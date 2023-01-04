import { ClientDto } from '../client-dto';

export abstract class ClientRepository {
  abstract findBy(
    idusers: number,
    field: string,
    value: string | number,
  ): Promise<ClientDto[]>;
  abstract find(idusers: number): Promise<ClientDto[]>;
  abstract create({
    idusers,
    name,
    email,
    phone,
    idsegments,
  }: any): Promise<void>;
  abstract update({
    idusers,
    idclients,
    name,
    email,
    phone,
    idsegment,
  }: any): Promise<void>;
  abstract delete(idusers: number, idclients: number): Promise<void>;
}
