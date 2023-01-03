import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(4)
  @Max(130)
  age: number;
}
