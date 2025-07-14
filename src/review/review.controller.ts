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
import { DeleteResult } from 'mongoose';

import { Review, ReviewDocument } from './review.model';
import { ReviewService } from './review.service';
import {
  REVIEW_CANT_CREATE_ERROR,
  REVIEW_CANT_DELETE_ERROR,
  REVIEW_CANT_FOUND_ERROR,
} from './review.constants';
import { CreateReviewDto } from './dto/createReview.dto';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto): Promise<ReviewDocument> {
    const createdReview: ReviewDocument = await this.reviewService.create(dto);
    if (!createdReview)
      throw new HttpException(REVIEW_CANT_CREATE_ERROR, HttpStatus.BAD_REQUEST);
    return createdReview;
  }

  @Get(':id')
  async findByid(@Param('id', IdValidationPipe) id: string) {
    const review = await this.reviewService.find(id);
    if (!review)
      throw new HttpException(REVIEW_CANT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    return review;
  }

  @Get('product/:productId')
  async findByProductId(
    @Param('productId') productId: string,
  ): Promise<ReviewDocument[]> {
    const reviews = await this.reviewService.findByProductId(productId);
    if (!reviews)
      throw new HttpException(REVIEW_CANT_FOUND_ERROR, HttpStatus.BAD_REQUEST);

    return reviews;
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedReview = await this.reviewService.delete(id);
    if (!deletedReview)
      throw new HttpException(REVIEW_CANT_DELETE_ERROR, HttpStatus.NOT_FOUND);

    return deletedReview;
  }

  @Delete('product/:productId')
  async deleteByProductId(
    @Param('productId') productId: string,
  ): Promise<DeleteResult> {
    const deletedCount = await this.reviewService.deleteByProductId(productId);
    if (!deletedCount)
      throw new HttpException(REVIEW_CANT_CREATE_ERROR, HttpStatus.BAD_REQUEST);
    return deletedCount;
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() dto: Review,
  ): Promise<ReviewDocument | null> {
    const updatedReview = await this.reviewService.patch(id, dto);
    if (!updatedReview)
      throw new HttpException(REVIEW_CANT_CREATE_ERROR, HttpStatus.BAD_REQUEST);
    return updatedReview;
  }
}
