import { ScheduleDTO, ScheduleStatus } from '../schedule-dto';
import { InvalidParamsEntityException } from './exceptions/invalid-params-entity';
import { InvalidScheduleException } from './exceptions/invalid-schedule';

export class ScheduleEntity {
  private constructor(private readonly props: ScheduleDTO) {}

  static create(
    params: ScheduleDTO,
  ): ScheduleEntity | InvalidScheduleException {
    const errors = [];
    if (!params.idusers) {
      errors.push(new InvalidParamsEntityException('Idusers is invalid'));
    }
    if (!params.idclients) {
      errors.push(new InvalidParamsEntityException('Idclients is invalid'));
    }
    if (!params.description) {
      errors.push(new InvalidParamsEntityException('Description is invalid'));
    }
    if (!params.time) {
      errors.push(new InvalidParamsEntityException('Time is invalid'));
    }
    if (!params.date) {
      errors.push(new InvalidParamsEntityException('Date is invalid'));
    }
    if (!params.pacote && params.pacote !== false) {
      errors.push(new InvalidParamsEntityException('Pacote is invalid'));
    }
    if (
      !params.status ||
      (params.status !== ScheduleStatus.PENDING &&
        params.status !== ScheduleStatus.FINISHED)
    ) {
      errors.push(new InvalidParamsEntityException('Status is invalid'));
    }
    if (params.status === ScheduleStatus.FINISHED) {
      errors.push(
        new InvalidParamsEntityException('Status cannot be FINISHED'),
      );
    }
    if (errors.length > 0) {
      return new InvalidScheduleException(
        'Invalids params for create schedule entity',
        errors,
      );
    }
    return new ScheduleEntity(params);
  }

  getProps(): ScheduleDTO {
    return this.props;
  }
}
