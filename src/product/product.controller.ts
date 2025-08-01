import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductDocument } from './product.model';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() dto: CreateProductDto): Promise<ProductDocument> {
    return this.productService.create(dto);
  }

  @Get(':id')
  async findByid(
    @Param('id', IdValidationPipe) id: string,
  ): Promise<ProductDocument> {
    const product = await this.productService.find(id);
    if (!product) {
      throw new HttpException('Product not found', 404);
    }
    return product;
  }

  @Delete(':id')
  async delete(
    @Param('id', IdValidationPipe) id: string,
  ): Promise<ProductDocument | null> {
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
