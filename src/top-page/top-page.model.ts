import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export type TopPageDocument = HydratedDocument<TopPage>;

@Schema({ id: true, timestamps: true })
export class TopPage {
  @Prop()
  firstCategory: TopLevelCategory;
  @Prop()
  secondCategory: string;
  @Prop()
  title: string;
  @Prop()
  category: string;
  @Prop({
    type: {
      count: Number,
      juniorSalary: Number,
      middleSalary: Number,
      seniorSalary: Number,
    },
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

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
