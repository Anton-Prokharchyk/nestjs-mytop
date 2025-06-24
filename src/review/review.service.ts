import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, DeleteResult } from 'mongoose';

import { Review, ReviewDocument } from './review.model';
import { CreateReviewDto } from './dto/createReview.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async find(id: string): Promise<ReviewDocument | null> {
    return this.reviewModel.findById(id);
  }

  async create(dto: CreateReviewDto): Promise<ReviewDocument> {
    const newReview: ReviewDocument = new this.reviewModel(dto);
    return newReview.save();
  }

  async delete(id: string): Promise<ReviewDocument | null> {
    return this.reviewModel.findByIdAndDelete(id);
  }

  async patch(id: string, dto: Review): Promise<ReviewDocument | null> {
    return this.reviewModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async findByProductId(productId: string): Promise<ReviewDocument[]> {
    return this.reviewModel.find({ productId });
  }

  async deleteByProductId(productId: string): Promise<DeleteResult> {
    return this.reviewModel.deleteMany({ productId });
  }
}
