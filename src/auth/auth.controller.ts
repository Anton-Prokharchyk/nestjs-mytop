import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { USER_ALREADY_EXISTS_ERROR } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(@Inject() private readonly authService: AuthService) {}
  @Post('registration')
  async register(@Body() dto: RegistrationDto) {
    const createdUser = await this.authService.createUser(dto);
    if (!createdUser)
      throw new HttpException(
        USER_ALREADY_EXISTS_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    return createdUser;
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: RegistrationDto) {}
}
