import { UserDto } from '../modules/users/user-dto';

export type RequestType = {
  query: any;
  params: any;
  user: UserDto;
  body: any;
};
