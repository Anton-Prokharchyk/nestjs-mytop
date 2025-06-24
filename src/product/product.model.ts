import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

class ProductCharacteristics {
  name: string;
  value: string;
}

@Schema({ id: true, timestamps: true })
export class Product {
  _id: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  oldPrice: number;

  @Prop({ type: Number })
  credit: number;

  @Prop({ type: Number })
  calculatedRating: number;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  advantages: string;

  @Prop({ type: String })
  disAdvantages: string;

  @Prop([String])
  categories: string[];

  @Prop({ type: String })
  tags: string;

  @Prop([ProductCharacteristics])
  characteristics: ProductCharacteristics[];

  createdAt: Date;

  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
