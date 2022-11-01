import { CreateClientService } from './create';
import { UpdateClientService } from './update';
import { DeleteClientService } from './delete';
import { FindClientService } from './find';

export const clientService = [
  CreateClientService,
  UpdateClientService,
  DeleteClientService,
  FindClientService,
];
