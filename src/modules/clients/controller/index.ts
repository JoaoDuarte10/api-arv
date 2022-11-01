import { CreateClientController } from './create-client';
import { UpdateClientController } from './update-client';
import { DeleteClientController } from './delete';
import { FindAllClientsController } from './find-all-clients';
import { FindClientByIdController } from './find-by-id';
import { FindClientBySegmentController } from './find-by-segment';

export const clientController = [
  CreateClientController,
  UpdateClientController,
  DeleteClientController,
  FindAllClientsController,
  FindClientByIdController,
  FindClientBySegmentController,
];
