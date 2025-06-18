import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Product } from '../product/product.model';

export type ReviewDocument = HydratedDocument<Review>;
@Schema({ id: true, timestamps: true })
export class Review {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  title: string;

  @Prop()
  rating: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: Product.name })
  productId: mongoose.Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
