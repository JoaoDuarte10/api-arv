import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export enum ScheduleStatus {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
}

export class ScheduleDTO {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  idusers: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  idclients: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  clientName: string;

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
  @IsBoolean()
  @IsOptional()
  pacote: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  atendenceCount: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  totalAtendenceCount: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status: ScheduleStatus;
}
