import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum SalesStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
}

export class SalesDTO {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  idsales?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  idusers?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  idclients?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentStatus: SalesStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  paymentDate: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  created_at?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  updated_at?: string;
}
