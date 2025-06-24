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
const testUpdateProduct = {
  image: 'string1',
  title: 'string1',
  price: 2,
  oldPrice: 2,
  credit: 2,
  calculatedRating: 2,
  description: 'string1',
  advantages: 'string1',
  disAdvantages: 'string1',
  categories: ['string1'],
  tags: 'string1',
  characteristics: [{ name: 'name1', value: 'value1' }],
};

let testCreatedProduct: Product;
let testUpdatedProduct: Product;

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

  it('[PATCH]product/:id - success', async () => {
    const res: request.Response = await request(server)
      .patch(`/product/${testCreatedProduct._id}`)
      .send(testUpdateProduct);
    const data = res.body as Product;
    expect(data).toMatchObject(testUpdateProduct);
    expect(data._id).toBeDefined();
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
  });

  it('[DELETE]product/:productId - success', async () => {
    const res: request.Response = await request(server).delete(
      `/product/${testCreatedProduct._id}`,
    );
    const deletedProduct = res.body as Product;
    expect(deletedProduct._id).toEqual(testCreatedProduct._id);
  });
});
