import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Review, ReviewDocument } from './review.model';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async find(id: string) {
    return this.reviewModel.findById(id);
  }

  async create(dto: Review): Promise<ReviewDocument> {
    const newReview: ReviewDocument = new this.reviewModel(dto);
    return newReview.save();
  }

  async delete(id: string): Promise<ReviewDocument | null> {
    return this.reviewModel.findByIdAndDelete(id);
  }

  async patch(id: string, dto: Review): Promise<ReviewDocument | null> {
    return this.reviewModel.findByIdAndUpdate(id, dto, { new: true });
  }
}
