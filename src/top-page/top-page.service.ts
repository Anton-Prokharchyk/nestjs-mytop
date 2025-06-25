import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TopPageDocument, TopPage } from './top-page.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { UpdateTopPageDto } from './dto/update-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name) private topPageModel: Model<TopPage>,
  ) {}

  async find(id: string) {
    return this.topPageModel.findById(id);
  }

  async create(dto: CreateTopPageDto): Promise<TopPageDocument> {
    const newTopPage: TopPageDocument = new this.topPageModel(dto);
    return newTopPage.save();
  }

  async delete(id: string): Promise<TopPageDocument | null> {
    return this.topPageModel.findByIdAndDelete(id);
  }

  async patch(
    id: string,
    dto: UpdateTopPageDto,
  ): Promise<TopPageDocument | null> {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true });
  }
}
