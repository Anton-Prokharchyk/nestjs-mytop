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
} from '@nestjs/common';

import { TopPage } from './top-page.model';
import { TopPageService } from './top-page.service';
import {
  TOP_PAGE_CANT_CREATE,
  TOP_PAGE_CANT_DELETE,
  TOP_PAGE_CANT_FOUND,
  TOP_PAGE_CANT_UPDATE,
} from './top-page.constants';
import { UpdateTopPageDto } from './dto/update-top-page.dto';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}
  @Post('create')
  async create(@Body() dto: CreateTopPageDto): Promise<TopPage> {
    const created = await this.topPageService.create(dto);
    if (!created) {
      throw new HttpException(TOP_PAGE_CANT_CREATE, HttpStatus.BAD_REQUEST);
    }
    return created;
  }

  @Get(':id')
  async findById(@Param('id', IdValidationPipe) id: string) {
    const found = await this.topPageService.find(id);
    if (!found) {
      throw new HttpException(TOP_PAGE_CANT_FOUND, HttpStatus.NOT_FOUND);
    }
    return found;
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deleted = await this.topPageService.delete(id);
    if (!deleted) {
      throw new HttpException(TOP_PAGE_CANT_DELETE, HttpStatus.BAD_REQUEST);
    }
    return deleted;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: UpdateTopPageDto) {
    const updated = await this.topPageService.patch(id, dto);
    if (!updated) {
      throw new HttpException(TOP_PAGE_CANT_UPDATE, HttpStatus.BAD_REQUEST);
    }
    return updated;
  }
}
