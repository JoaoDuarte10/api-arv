import { Injectable } from '@nestjs/common';
import { UserDto } from '../user-dto';
import { UserRepository } from '../repository/user-repository';
import { ClientAlreadyExistsException } from '../exceptions/client-already-exists';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: UserDto) {
    const userAlreadyExists = await this.userRepository.findBy(
      'name',
      user.name,
    );
    if (userAlreadyExists) {
      throw new ClientAlreadyExistsException('Client already exists');
    }
    await this.userRepository.create(user);
  }
}
