import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ id: true, timestamps: true })
export class User {
  _id: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  createdAt: Date;

  udpatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
