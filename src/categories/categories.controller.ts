import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { type Category, type Prisma } from '../../generated/prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() categoryData: Prisma.CategoryCreateInput): Promise<Category> {
    return this.categoriesService.create(categoryData);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category | null> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() categoryData: Prisma.CategoryUpdateInput,
  ): Promise<Category | null> {
    return this.categoriesService.update(id, categoryData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.remove(id);
  }
}
