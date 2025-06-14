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

import { TopPage } from './top-page.model';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(
    private readonly topPageService: TopPageService, // Assuming TopPageService is defined and injected
  ) {}
  @Post('create')
  async create(@Body() dto: Omit<TopPage, '_id'>): Promise<TopPage> {
    const created = await this.topPageService.create(dto);
    return created;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const found = await this.topPageService.find(id);
    return found;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.topPageService.delete(id);
    console.log('Deleted TopPage:', deleted);
    return deleted;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: TopPage) {
    const updated = await this.topPageService.patch(id, dto);
    console.log('Updated TopPage:', updated);
    return updated;
  }
}
