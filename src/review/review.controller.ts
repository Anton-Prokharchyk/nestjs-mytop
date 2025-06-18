import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Review, ReviewDocument } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async create(@Body() dto: Review): Promise<ReviewDocument> {
    return this.reviewService.create(dto);
  }

  @Get(':id')
  async findByid(@Param('id') id: string) {
    console.log(id);
    return this.reviewService.find(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() dto: Review,
  ): Promise<ReviewDocument | null> {
    return this.reviewService.patch(id, dto);
  }
}
