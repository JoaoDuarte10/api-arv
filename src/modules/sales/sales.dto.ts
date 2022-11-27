import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  date: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  total: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  created_at?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  updated_at?: string;
}
