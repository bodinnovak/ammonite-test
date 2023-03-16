import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateListDto {
  @IsOptional()
  id?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  totalTime: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  artist: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  tag: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  artistInfoName: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  visited: number;
}
