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

  async create(params: ClientDto): Promise<void> {
    this.clients.push({
      idclients: this.clients.length + 1,
      idusers: params.idusers,
      name: params.name,
      email: params.email,
      phone: params.phone,
      idsegment: params.idsegment,
      address: params.address,
      addressNumber: params.addressNumber,
      note: params.note,
      created_at: new Date().toISOString(),
      updated_at: null,
    });
  }

  async update(params: ClientDto): Promise<void> {
    const client = this.clients.find(
      (item) =>
        item.idusers === params.idusers && item.idclients === params.idclients,
    );

    client.name = params.name;
    client.email = params.email;
    client.phone = params.phone;
    client.idsegment = params.idsegment;
    client.address = params.address;
    client.addressNumber = params.addressNumber;
    client.note = params.note;
  }

  async delete(idusers: number, idclients: number): Promise<void> {
    const client = this.clients.find(
      (item) => item.idusers === idusers && item.idclients === idclients,
    );

    this.clients.splice(this.clients.indexOf(client), 1);
  }
}
