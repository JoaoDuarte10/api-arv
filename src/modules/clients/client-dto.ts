import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty()
  @IsOptional()
  idclients: number;

  @ApiProperty()
  @IsOptional()
  idusers: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsOptional()
  idsegment: number;

  @ApiProperty()
  @IsOptional()
  created_at?: string;

  @ApiProperty()
  @IsOptional()
  updated_at?: string;
}
