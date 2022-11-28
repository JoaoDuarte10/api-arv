export enum ScheduleStatus {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
}

export class ScheduleDTO {
  idusers: number;
  idclients: number;
  clientName: number;
  description: string;
  time: string;
  date: string;
  pacote: boolean;
  atendenceCount: number;
  totalAtendenceCount: number;
  status: ScheduleStatus;
}
