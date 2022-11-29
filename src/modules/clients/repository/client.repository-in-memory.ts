import { ClientDto } from '../client-dto';

export class ClientRepositoryInMemory {
  clients: ClientDto[] = [];

  async findBy(
    idusers: number,
    field: string,
    value: string | number,
  ): Promise<ClientDto[]> {
    return this.clients.filter(
      (client) => client.idusers === idusers && client[field] === value,
    );
  }

  async find(idusers: number): Promise<ClientDto[]> {
    return this.clients.filter((client) => client.idusers === idusers);
  }

  async create({
    idusers,
    name,
    email,
    phone,
    idsegments,
  }: any): Promise<void> {
    this.clients.push({
      idclients: this.clients.length + 1,
      idusers,
      name,
      email,
      phone,
      idsegment: idsegments,
      created_at: new Date().toISOString(),
      updated_at: null,
    });
  }

  async update({
    idusers,
    idclients,
    name,
    email,
    phone,
    idsegments,
  }: any): Promise<void> {
    const client = this.clients.find(
      (item) => item.idusers === idusers && item.idclients === idclients,
    );

    client.name = name;
    client.email = email;
    client.phone = phone;
    client.idsegment = idsegments;
  }

  async delete(idusers: number, idclients: number): Promise<void> {
    const client = this.clients.find(
      (item) => item.idusers === idusers && item.idclients === idclients,
    );

    this.clients.splice(this.clients.indexOf(client), 1);
  }
}
