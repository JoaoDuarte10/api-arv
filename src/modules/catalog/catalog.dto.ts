import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CatalogInputDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  idUsers: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  idCatalog?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  duration: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  updatedAt?: string;
}
