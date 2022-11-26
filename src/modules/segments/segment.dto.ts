import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class SegmentDTO {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  idsegments: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  idusers?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  created_at?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  updated_at?: string;
}
