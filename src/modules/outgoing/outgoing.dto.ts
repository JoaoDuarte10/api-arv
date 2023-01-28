import { ApiProperty } from '@nestjs/swagger';
import {
  PaymentMethodType,
  PaymentMethodTypeTranslated,
} from '../../types/payment';
import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export enum OutgoingInstallmentTranslated {
  A_VISTA = 'À vista',
  PARCELADO = 'Parcelado',
}

export class OutgoingDTO {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  idoutgoing?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  idusers: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentMethod: PaymentMethodType | PaymentMethodTypeTranslated;

  @ApiProperty()
  @IsOptional()
  installment: boolean | OutgoingInstallmentTranslated;

  @ApiProperty()
  @IsString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  updatedAt?: string;
}
