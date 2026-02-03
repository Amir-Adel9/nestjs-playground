import { Injectable } from '@nestjs/common';
import { Category } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async create(categoryData: CreateCategoryDto) {
    return await this.prisma.category.create({ data: categoryData });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string): Promise<Category | null> {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async update(id: string, categoryData: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: categoryData,
    });
  }

  async remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
