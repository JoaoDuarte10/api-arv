import { ScheduleDTO, ScheduleStatus } from '../schedule-dto';
import { InvalidScheduleException } from './exceptions/invalid-schedule';
import { InvalidParamsEntityException } from '../../../exceptions/invalid-params-entity';

export class ScheduleEntity {
  private constructor(private readonly props: ScheduleDTO) {}

  static create(
    params: ScheduleDTO,
  ): ScheduleEntity | InvalidScheduleException {
    const errors = [];
    if (!params.idusers) {
      errors.push(new InvalidParamsEntityException('Idusers is invalid'));
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
    if (!params.status) {
      params.status = ScheduleStatus.PENDING;
    }
    if (
      params.status !== ScheduleStatus.PENDING &&
      params.status !== ScheduleStatus.FINISHED
    ) {
      errors.push(new InvalidParamsEntityException('Status is invalid'));
    }
    if (params.status === ScheduleStatus.FINISHED) {
      errors.push(
        new InvalidParamsEntityException('Status cannot be FINISHED'),
      );
    }
    if (params.pacote && !params.totalAtendenceCount) {
      errors.push(
        new InvalidParamsEntityException('Total Atendence Count is invalid'),
      );
    }
    if (params.pacote && !params.atendenceCount) {
      params.atendenceCount = 0;
    }
    if (errors.length > 0) {
      return new InvalidScheduleException(
        'Invalids params for create schedule entity',
        errors,
      );
    }
    return new ScheduleEntity(params);
  }

  getTime(): string {
    return this.props.time;
  }

  getDate(): string {
    return this.props.date;
  }

  getProps(): ScheduleDTO {
    return this.props;
  }

  finish(): void {
    if (
      this.isPacote() &&
      this.props.atendenceCount < this.props.totalAtendenceCount
    ) {
      this.addAtendence();
    }
    if (this.isValidForFinish()) {
      this.props.status = ScheduleStatus.FINISHED;
    }
  }

  private addAtendence(): void {
    this.props.atendenceCount += 1;
  }

  private isPacote(): boolean {
    return this.props.pacote;
  }

  private pacoteIsValidForFinish(): boolean {
    return this.props.atendenceCount === this.props.totalAtendenceCount;
  }

  private isValidForFinish(): boolean {
    const statusIsPending = this.props.status !== ScheduleStatus.FINISHED;
    if (this.isPacote()) {
      return this.pacoteIsValidForFinish() && statusIsPending;
    }
    return statusIsPending;
  }
}
