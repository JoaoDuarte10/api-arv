import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RulesDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  idclients_rules: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  idrules: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  idusers: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  has_active: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  created_at: string;
}
