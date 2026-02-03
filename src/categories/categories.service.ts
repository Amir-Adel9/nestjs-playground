import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async create(categoryData: Prisma.CategoryCreateInput): Promise<Category> {
    return await this.prisma.category.create({ data: categoryData });
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string): Promise<Category | null> {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async update(
    id: string,
    categoryData: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return await this.prisma.category.update({
      where: { id },
      data: categoryData,
    });
  }

  async remove(id: string): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }
}
