import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { TopPageModule } from './top-page/top-page.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-mytop'),
    ProductModule,
    AuthModule,
    ReviewModule,
    TopPageModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
  exports: [ConfigModule],
})
export class AppModule {}
