import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create() {
    const newProduct = new this.productModel({});
    console.log(Product.name);
    console.log(newProduct);
    return newProduct.save();
  }
}
