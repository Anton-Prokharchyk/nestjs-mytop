import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {}

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}
}
