import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() dto: Omit<Product, '_id'>): Promise<Product> {
    return this.productService.create(dto);
  }

  @Get(':id')
  async findByid(@Param('id') id: string) {
    return this.productService.find(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: Product) {
    return this.productService.patch(id, dto);
  }
}
