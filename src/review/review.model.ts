import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Product } from '../product/product.model';

@Schema({ id: true, timestamps: true })
export class Review {
  _id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  title: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Product.name,
    required: true,
  })
  productId: mongoose.Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}
export type ReviewDocument = HydratedDocument<Review>;

export const ReviewSchema = SchemaFactory.createForClass(Review);
