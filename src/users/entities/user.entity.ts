import { Exclude } from 'class-transformer';
import { IUser } from '../interfaces/IUser';

export class UserEntity implements IUser {
  id: string;
  login: string;
  age: number;

  @Exclude()
  password: string;

  @Exclude()
  isDeleted: boolean;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
