import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return new UserEntity(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, ...userData } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });
    return new UserEntity(user);
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.update({ where: { id }, data });
    return new UserEntity(user);
  }

  async removeUser(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.delete({ where: { id } });
    return new UserEntity(user);
  }
}
