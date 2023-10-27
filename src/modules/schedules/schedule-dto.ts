import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';

export enum ScheduleStatus {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
}

export class ScheduleDTO {
  idschedules?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  idusers?: number;

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

  @ApiProperty()
  @IsArray()
  @IsOptional()
  idCatalogs?: number[];

  @ApiProperty()
  @IsOptional()
  scheduleServices?: any[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  createdAt?: string;
}
