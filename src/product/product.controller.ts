import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Product } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly configService: ConfigService,
    private readonly productService: ProductService,
  ) {}
  @Post('create')
  async create(@Body() dto: Omit<Product, '_id'>) {
    console.log(this.configService.get('PORT'));
    console.log(this.configService.get('PORT'));
    return this.productService.create();
  }

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: Product) {}

  @HttpCode(200)
  @Post(':id')
  async find(@Body() dto: FindProductDto) {}
}
