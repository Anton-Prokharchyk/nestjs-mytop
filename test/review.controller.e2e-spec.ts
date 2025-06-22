import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Server } from 'http';

import { AppModule } from 'src/app.module';
import { CreateReviewDto } from 'src/review/dto/createReview.dto';
import { ReviewDocument } from 'src/review/review.model';

const testReviewDto: CreateReviewDto = {
  rating: 1,
  name: 'name',
  title: 'title',
  description: 'description',
  productId: 'productId',
};

console.log(CreateReviewDto);

describe('review controller', () => {
  let app: INestApplication;
  let server: Server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer() as Server;
  });

  it('review/create (POST)', async () => {
    const res: request.Response = await request(server)
      .post('/review/create')
      .send(testReviewDto);
    const data = res.body as ReviewDocument;
    expect(data).toMatchObject(testReviewDto);
    expect(data._id).toBeDefined();
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
  });
});
