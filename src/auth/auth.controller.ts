import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { USER_ALREADY_EXISTS_ERROR } from './auth.constants';
import { UserDocument } from './user.model';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject() private readonly authService: AuthService,
    @Inject() private readonly jwtService: JwtService,
  ) {}

  @Post('registration')
  async register(@Body() dto: RegistrationDto): Promise<UserDocument> {
    const createdUser = await this.authService.createUser(dto);
    if (!createdUser)
      throw new HttpException(
        USER_ALREADY_EXISTS_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    return createdUser;
  }

  @Post('login')
  async login(
    @Body() dto: RegistrationDto,
  ): Promise<{ user: UserDocument; token: string }> {
    const validatedUser: UserDocument =
      await this.authService.validateUser(dto);
    const token = await this.jwtService.signAsync({
      email: validatedUser.email,
    });
    return { user: validatedUser, token };
  }
}
