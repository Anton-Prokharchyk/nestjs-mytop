import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
import { ProductDocument } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async find(id: string): Promise<ProductDocument | null> {
    return this.productModel.findById(id);
  }

  async create(dto: CreateProductDto): Promise<ProductDocument> {
    const newProduct: ProductDocument = new this.productModel(dto);
    return newProduct.save();
  }

  async delete(id: string): Promise<ProductDocument | null> {
    return this.productModel.findByIdAndDelete(id);
  }

  async patch(
    id: string,
    dto: UpdateProductDto,
  ): Promise<ProductDocument | null> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true });
  }
}
