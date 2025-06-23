import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Server } from 'http';
import { disconnect } from 'mongoose';

import { AppModule } from 'src/app.module';
import { CreateReviewDto } from 'src/review/dto/createReview.dto';
import { Review } from 'src/review/review.model';

const testCreateReviewDto: CreateReviewDto = {
  rating: 1,
  name: 'name',
  title: 'title',
  description: 'description',
  productId: 'productId',
};
let testCreateReviewId: string;
const testUpdatedReviewDto: CreateReviewDto = {
  rating: 2,
  name: 'name2',
  title: 'title2',
  description: 'description2',
  productId: 'productId2',
};

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

  afterAll(async () => {
    await disconnect();
  });

  it('[POST]review/create - success', async () => {
    const res = await request(server)
      .post('/review/create')
      .send(testCreateReviewDto)
      .expect(201);
    const data = res.body as Review;
    expect(data).toMatchObject(testCreateReviewDto);
    expect(data._id).toBeDefined();
    testCreateReviewId = data._id;
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
  });

  it('[GET]review/:id - success', async () => {
    const res: request.Response = await request(server).get(
      `/review/${testCreateReviewId}`,
    );
    const data = res.body as Review;
    expect(data).toMatchObject(testCreateReviewDto);
    expect(data._id).toBeDefined();
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
  });

  it('[PATCH]review/:id - success', async () => {
    const res: request.Response = await request(server)
      .patch(`/review/${testCreateReviewId}`)
      .send(testUpdatedReviewDto);
    const data = res.body as Review;
    expect(data).toMatchObject(testUpdatedReviewDto);
    expect(data._id).toBeDefined();
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
  });
});
