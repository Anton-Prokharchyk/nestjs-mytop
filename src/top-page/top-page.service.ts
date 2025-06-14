import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TopPageDocument, TopPage } from './top-page.model';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name) private topPageModel: Model<TopPage>,
  ) {}

  async find(id: string) {
    return this.topPageModel.findById(id);
  }

  async create(dto: Omit<TopPage, '_id'>): Promise<TopPage> {
    const newTopPage: TopPageDocument = new this.topPageModel(dto);
    return newTopPage.save();
  }

  async delete(id: string): Promise<TopPage | null> {
    return this.topPageModel.findByIdAndDelete(id);
  }

  async patch(id: string, dto: TopPage): Promise<TopPage | null> {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true });
  }
}
