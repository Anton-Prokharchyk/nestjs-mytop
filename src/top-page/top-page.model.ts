import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

@Schema({ id: true })
export class TopPageModel {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  })
  _id: string;

  @Prop()
  firstCategory: TopLevelCategory;
  @Prop()
  secondCategory: string;
  @Prop()
  title: string;
  @Prop()
  category: string;
  @Prop({
    count: Number,
    juniorSalary: Number,
    middleSalary: Number,
    seniorSalary: Number,
  })
  hh?: {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
  };
  @Prop([{ title: String, description: String }])
  advantages: { title: string; description: string }[];
  @Prop()
  seoText: string;
  @Prop()
  tagsTitle: string;
  @Prop([String])
  tags: string[];
}

export const TopPageModelSchema = SchemaFactory.createForClass(TopPageModel);
