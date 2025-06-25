import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() dto: RegistrationDto) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: RegistrationDto) {}
}
