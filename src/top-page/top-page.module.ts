import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';
import { TopPage, TopPageSchema } from './top-page.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TopPage.name, schema: TopPageSchema }]),
  ],
  controllers: [TopPageController],
  providers: [TopPageService],
})
export class TopPageModule {}
