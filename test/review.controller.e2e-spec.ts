import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Server } from 'http';
import { DeleteResult, disconnect } from 'mongoose';

import { AppModule } from 'src/app.module';
import { CreateReviewDto } from 'src/review/dto/createReview.dto';
import { Review } from 'src/review/review.model';
import { Product } from 'src/product/product.model';
import { UpdateReviewDto } from 'src/review/dto/updateReview.dto';

const testCreateProduct = {
  image: 'string',
  title: 'string',
  price: 1,
  oldPrice: 1,
  credit: 1,
  calculatedRating: 1,
  description: 'string',
  advantages: 'string',
  disAdvantages: 'string',
  categories: ['string'],
  tags: 'string',
  characteristics: [{ name: 'name', value: 'value' }],
};
let testCreatedProductId: string;
const testCreateReview: CreateReviewDto = {
  rating: 1,
  name: 'name',
  title: 'title',
  description: 'description',
  productId: 'testCreatedProductId',
};
const testUpdatedReview: UpdateReviewDto = {
  rating: 2,
  name: 'name2',
  title: 'title2',
  description: 'description2',
};
let testFirstCreatedReview: Review;

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

    await (async () => {
      const res: request.Response = await request(server)
        .post('/product/create')
        .send(testCreateProduct);
      const createdProduct = res.body as Product;
      testCreatedProductId = createdProduct._id;
      testCreateReview.productId = testCreatedProductId;
    })();
  });

  afterAll(async () => {
    await disconnect();
  });

  it('[POST]review/create - success', async () => {
    let res: request.Response = await request(server)
      .post('/review/create')
      .send(testCreateReview)
      .expect(201);
    let data = res.body as Review;
    expect(data).toMatchObject(testCreateReview);
    expect(data._id).toBeDefined();
    testFirstCreatedReview = data;
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
    res = await request(server)
      .post('/review/create')
      .send(testCreateReview)
      .expect(201);
    data = res.body as Review;
  });

  it('[GET]review/:id - success', async () => {
    const res: request.Response = await request(server).get(
      `/review/${testFirstCreatedReview._id}`,
    );
    const data = res.body as Review;
    expect(data).toMatchObject(testCreateReview);
    expect(data._id).toBeDefined();
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
  });

  it('[PATCH]review/:id - success', async () => {
    const res: request.Response = await request(server)
      .patch(`/review/${testFirstCreatedReview._id}`)
      .send(testUpdatedReview);
    const data = res.body as Review;
    expect(data).toMatchObject(testUpdatedReview);
    expect(data._id).toBeDefined();
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
  });

  it('[GET]review/product/:productId - success', async () => {
    const res: request.Response = await request(server).get(
      `/review/product/${testCreatedProductId}`,
    );
    const data = res.body as Review[];
    const findedReview: Review = data[0];
    expect(findedReview).toMatchObject(testUpdatedReview);
    expect(findedReview._id).toEqual(testFirstCreatedReview._id);
    expect(findedReview.createdAt).toEqual(testFirstCreatedReview.createdAt);
    expect(findedReview.updatedAt).not.toEqual(
      testFirstCreatedReview.updatedAt,
    );
  });

  it('[DELETE]review/:reviewId - success', async () => {
    const res: request.Response = await request(server).delete(
      `/review/${testFirstCreatedReview._id}`,
    );
    const deletedReview = res.body as Review;
    expect(deletedReview._id).toEqual(testFirstCreatedReview._id);
  });

  it('[DELETE]review/product/:productId - success', async () => {
    const res: request.Response = await request(server).delete(
      `/review/product/${testCreatedProductId}`,
    );
    const data = res.body as DeleteResult;
    expect(data.deletedCount).toEqual(1);
  });
});
