import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductDocument } from './product.model';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() dto: CreateProductDto): Promise<ProductDocument> {
    return this.productService.create(dto);
  }

  @Get(':id')
  async findByid(@Param('id') id: string): Promise<ProductDocument | null> {
    return this.productService.find(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ProductDocument | null> {
    return this.productService.delete(id);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductDocument | null> {
    return this.productService.patch(id, dto);
  }
}
