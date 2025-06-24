import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Server } from 'http';
import { disconnect } from 'mongoose';

import { AppModule } from 'src/app.module';
import { CreateReviewDto } from 'src/review/dto/createReview.dto';
import { Review } from 'src/review/review.model';
import { Product } from 'src/product/product.model';

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

const testUpdatedProduct = {
  rating: 2,
  name: 'name2',
  title: 'title2',
  description: 'description2',
  productId: 'testCreatedProductId',
};
let testCreatedProduct: Product;

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

  it('[POST]product/create - success', async () => {
    const res: request.Response = await request(server)
      .post('/product/create')
      .send(testCreateProduct)
      .expect(201);
    const data = res.body as Product;
    expect(data).toMatchObject(testCreateProduct);
    expect(data._id).toBeDefined();
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
    testCreatedProduct = data;
  });

  it('[GET]product/:id - success', async () => {
    const res: request.Response = await request(server).get(
      `/product/${testCreatedProduct._id}`,
    );
    const data = res.body as Product;
    expect(data).toMatchObject(testCreatedProduct);
    expect(data._id).toBeDefined();
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
  });

  // it('[PATCH]review/:id - success', async () => {
  //   const res: request.Response = await request(server)
  //     .patch(`/review/${testFirstCreatedReview._id}`)
  //     .send(testUpdatedReview);
  //   const data = res.body as Review;
  //   expect(data).toMatchObject(testUpdatedReview);
  //   expect(data._id).toBeDefined();
  //   expect(data.createdAt).toBeDefined();
  //   expect(data.updatedAt).toBeDefined();
  // });

  // it('[GET]review/product/:productId - success', async () => {
  //   const res: request.Response = await request(server).get(
  //     `/review/product/${testCreatedProductId}`,
  //   );
  //   const data = res.body as Review[];
  //   const findedReview: Review = data[0];
  //   expect(findedReview).toMatchObject(testUpdatedReview);
  //   expect(findedReview._id).toEqual(testFirstCreatedReview._id);
  //   expect(findedReview.createdAt).toEqual(testFirstCreatedReview.createdAt);
  //   expect(findedReview.updatedAt).not.toEqual(
  //     testFirstCreatedReview.updatedAt,
  //   );
  // });

  // it('[DELETE]review/:reviewId - success', async () => {
  //   const res: request.Response = await request(server).delete(
  //     `/review/${testFirstCreatedReview._id}`,
  //   );
  //   const deletedReview = res.body as Review;
  //   expect(deletedReview._id).toEqual(testFirstCreatedReview._id);
  // });

  // it('[DELETE]review/product/:productId - success', async () => {
  //   const res: request.Response = await request(server).delete(
  //     `/review/product/${testCreatedProductId}`,
  //   );
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //   expect(res.body?.deletedCount).toEqual(1);
  // });
});
