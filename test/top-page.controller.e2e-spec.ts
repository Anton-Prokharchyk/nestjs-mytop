import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Server } from 'http';
import { disconnect } from 'mongoose';

import { AppModule } from 'src/app.module';
import { TopLevelCategory, TopPage } from 'src/top-page/top-page.model';
import { UpdateTopPageDto } from 'src/top-page/dto/update-top-page.dto';
import { CreateTopPageDto } from 'src/top-page/dto/create-top-page.dto';

const testCreateTopPage: CreateTopPageDto = {
  firstCategory: TopLevelCategory.Books,
  secondCategory: 'string',
  title: 'string',
  category: 'string',
  hh: {
    count: 1,
    juniorSalary: 1,
    middleSalary: 1,
    seniorSalary: 1,
  },
  advantages: [{ title: 'string', description: 'string' }],
  seoText: 'string',
  tagsTitle: 'string',
  tags: ['string'],
};
const testUpdateTopPage: UpdateTopPageDto = {
  firstCategory: TopLevelCategory.Courses,
  secondCategory: 'string1',
  title: 'string1',
  category: 'string1',
  hh: {
    count: 11,
    juniorSalary: 11,
    middleSalary: 11,
    seniorSalary: 11,
  },
  advantages: [{ title: 'string1', description: 'string1' }],
  seoText: 'string1',
  tagsTitle: 'string1',
  tags: ['string1'],
};

let testCreatedTopPage: TopPage;

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

  it('[POST]top-page/create - success', async () => {
    const res: request.Response = await request(server)
      .post('/top-page/create')
      .send(testCreateTopPage)
      .expect(201);
    const data = res.body as TopPage;
    expect(data).toMatchObject(testCreateTopPage);
    expect(data._id).toBeDefined();
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
    testCreatedTopPage = data;
  });

  it('[GET]top-page/:id - success', async () => {
    const res: request.Response = await request(server).get(
      `/top-page/${testCreatedTopPage._id}`,
    );
    const data = res.body as TopPage;
    expect(data).toMatchObject(testCreatedTopPage);
    expect(data._id).toBeDefined();
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
  });

  // it('[PATCH]top-page/:id - success', async () => {
  //   const res: request.Response = await request(server)
  //     .patch(`/top-page/${testCreatedProduct._id}`)
  //     .send(testUpdateProduct);
  //   const data = res.body as Product;
  //   expect(data).toMatchObject(testUpdateProduct);
  //   expect(data._id).toBeDefined();
  //   expect(data.createdAt).toBeDefined();
  //   expect(data.updatedAt).toBeDefined();
  // });

  // it('[DELETE]top-page/:top-pageId - success', async () => {
  //   const res: request.Response = await request(server).delete(
  //     `/top-page/${testCreatedProduct._id}`,
  //   );
  //   const deletedProduct = res.body as Product;
  //   expect(deletedProduct._id).toEqual(testCreatedProduct._id);
  // });
});
