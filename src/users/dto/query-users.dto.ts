import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { toNumber } from '../utils';

export class QueryUsersDto {
  @IsOptional()
  @Transform(({ value }) => toNumber(value))
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  loginSubstring: string;
}
