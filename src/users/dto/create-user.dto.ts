import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/[0-9]/)
  @Matches(/[A-Z]/i)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(4)
  @Max(130)
  age: number;
}
