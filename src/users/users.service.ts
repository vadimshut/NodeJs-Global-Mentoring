import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/IUser';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';

@Injectable()
export class UsersService {
  private users: IUser[] = [];

  async getAll(query: QueryUsersDto): Promise<IUser[]> {
    let users: IUser[] = this.users.filter((user) => !user.isDeleted);
    const { limit, loginSubstring } = query;

    if (loginSubstring) {
      users = this.users.filter((user) =>
        user.login.toLocaleLowerCase().includes(loginSubstring.toLowerCase()),
      );
    }

    if (limit) users = this.users.splice(0, limit);

    return users.sort((a, b) =>
      a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1,
    );
  }

  async getById(id: string): Promise<IUser> {
    const user = this.users.find((user) => id === user.id && !user.isDeleted);
    if (user) return user;
    throw new NotFoundException();
  }

  async create(userDto: CreateUserDto): Promise<IUser> {
    const newUser = {
      id: uuidv4(),
      isDeleted: false,
      ...userDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  async update(id: string, userDto: UpdatePasswordDto): Promise<IUser> {
    const { oldPassword, newPassword, age } = userDto;
    let updatedUser: IUser | null = null;

    const user = this.users.find((user) => id === user.id);
    if (!user) throw new NotFoundException();

    if (user.password !== oldPassword || !age) {
      throw new ForbiddenException('Data is wrong');
    }

    this.users = this.users.map((user) =>
      user.id === id
        ? (updatedUser = {
            ...user,
            password: newPassword,
            age,
          })
        : user,
    );

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const user = this.users.find((user) => id === user.id);
    if (!user) throw new NotFoundException();

    this.users = this.users.map((user) =>
      user.id == id ? { ...user, isDeleted: true } : user,
    );
    return;
  }
}
