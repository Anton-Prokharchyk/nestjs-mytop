import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';

import { User, UserDocument } from './user.model';
import { RegistrationDto } from './dto/registration.dto';
import { USER_NOT_FOUND_ERROR, WORNG_PASSWORD_ERROR } from './auth.constants';

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
    const foundedUsers = await this.findUserByEmail(email);
    if (foundedUsers.length) return null;
    const salt = await genSalt(genSaltRounds);
    const createdPassHash = await hash(password, salt);
    return await this.userModel.create({
      email,
      passwordHash: createdPassHash,
    });
  }

  async findUserByEmail(email: string): Promise<UserDocument[]> {
    return this.userModel.find({ email });
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return compare(password, hashPassword);
  }

  async validateUser({
    email,
    password,
  }: RegistrationDto): Promise<UserDocument> {
    const findedUsers: UserDocument[] = await this.findUserByEmail(email);
    if (!findedUsers.length)
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    const findedUser: UserDocument = findedUsers[0];
    const isValidPassword = await this.comparePassword(
      password,
      findedUser.passwordHash,
    );
    if (!isValidPassword) throw new UnauthorizedException(WORNG_PASSWORD_ERROR);
    return findedUser;
  }
}
