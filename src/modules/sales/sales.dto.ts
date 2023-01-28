import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  PaymentMethodType,
  PaymentMethodTypeTranslated,
} from '../../types/payment';

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
  @IsNotEmpty()
  paymentMethod: PaymentMethodType | PaymentMethodTypeTranslated;

  @ApiProperty()
  @IsString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  updatedAt?: string;
}
