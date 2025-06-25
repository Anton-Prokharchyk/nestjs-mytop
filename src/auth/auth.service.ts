import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

import { User, UserDocument } from './user.model';
import { RegistrationDto } from './dto/registration.dto';

const secret: string = 'secret';
const genSaltRounds: number = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser({
    email,
    password,
  }: RegistrationDto): Promise<UserDocument | null> {
    const isUserExist = await this.userModel.find({ email });
    if (isUserExist.length) return null;
    console.log('after');
    const salt = await genSalt(genSaltRounds);
    const createdPassHash = await hash(password, salt);
    return await this.userModel.create({
      email,
      passwordHash: createdPassHash,
    });
  }
}
