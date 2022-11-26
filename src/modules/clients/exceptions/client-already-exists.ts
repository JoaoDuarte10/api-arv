export class ClientAlreadyExistsException extends Error {
  constructor(message: string) {
    super();
    this.name = 'ClientAlreadyExistsException';
    this.message = message;
  }
}
