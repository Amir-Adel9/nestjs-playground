import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entity/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async createCategory(categoryData: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: categoryData,
    });
    return new CategoryEntity(category);
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();
    return categories.map((category) => new CategoryEntity(category));
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return new CategoryEntity(category);
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
