import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export enum ScheduleStatus {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
}

export class ScheduleDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  idusers: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  idclients: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  clientName: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  time: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  date: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pacote: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  atendenceCount: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  totalAtendenceCount: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status: ScheduleStatus;
}
