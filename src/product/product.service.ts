import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
import { ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async find(id: string) {
    return this.productModel.findById(id);
  }

  async create(dto: Omit<Product, '_id'>): Promise<Product> {
    const newProduct: ProductDocument = new this.productModel(dto);
    return newProduct.save();
  }

  async delete(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id);
  }

  async patch(id: string, dto: Product): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true });
  }
}
