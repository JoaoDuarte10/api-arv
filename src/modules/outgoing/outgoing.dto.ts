import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export enum OutgoingPaymentMethodType {
  CREDIT_CARD = 'CREDIT_CARD',
  CASH = 'CASH',
  PIX = 'PIX',
  BILLET = 'BILLET',
}

export enum OutgoingPaymentMethodTypeTranslated {
  CARTAO_DE_CREDITO = 'Cartão de crédito',
  DINHEIRO = 'Dinheiro',
  PIX = 'PIX',
  BOLETO = 'Boleto',
}

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
  paymentMethod:
    | OutgoingPaymentMethodType
    | OutgoingPaymentMethodTypeTranslated;

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
