import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Review, ReviewDocument } from './review.model';
import { ReviewService } from './review.service';
import {
  REVIEW_CANT_CREATE,
  REVIEW_CANT_DELETE,
  REVIEW_CANT_FOUND,
} from './review.constants';
import { CreateReviewDto } from './dto/createReview.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto): Promise<ReviewDocument> {
    const createdReview: ReviewDocument = await this.reviewService.create(dto);
    if (!createdReview)
      throw new HttpException(REVIEW_CANT_CREATE, HttpStatus.BAD_REQUEST);
    return createdReview;
  }

  @Get(':id')
  async findByid(@Param('id') id: string) {
    const review = await this.reviewService.find(id);
    if (!review)
      throw new HttpException(REVIEW_CANT_FOUND, HttpStatus.NOT_FOUND);
    return review;
  }

  @Get('product/:productId')
  async findByProductId(
    @Param('productId') productId: string,
  ): Promise<ReviewDocument[]> {
    const reviews = await this.reviewService.findByProductId(productId);
    if (!reviews)
      throw new HttpException(REVIEW_CANT_FOUND, HttpStatus.BAD_REQUEST);

    return reviews;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedReview = await this.reviewService.delete(id);
    if (!deletedReview)
      throw new HttpException(REVIEW_CANT_DELETE, HttpStatus.NOT_FOUND);

    return deletedReview;
  }

  @Delete('product/:productId')
  async deleteByProductId(
    @Param('productId') productId: string,
  ): Promise<{ deletedCount: number }> {
    const deletedCount = await this.reviewService.deleteByProductId(productId);
    if (!deletedCount)
      throw new HttpException(REVIEW_CANT_CREATE, HttpStatus.BAD_REQUEST);
    return deletedCount;
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() dto: Review,
  ): Promise<ReviewDocument | null> {
    const updatedReview = await this.reviewService.patch(id, dto);
    if (!updatedReview)
      throw new HttpException(REVIEW_CANT_CREATE, HttpStatus.BAD_REQUEST);
    return updatedReview;
  }
}
