import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Server } from 'http';
import { disconnect } from 'mongoose';

import { AppModule } from 'src/app.module';
import { RegistrationDto } from 'src/auth/dto/registration.dto';
import { UserDocument } from 'src/auth/user.model';

const testUserCreate: RegistrationDto = {
  email: Math.random() + 'test1@example.com',
  password: 'password123',
};

describe('auth controller', () => {
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

  it('[POST]auth/registration - success', async () => {
    const res: request.Response = await request(server)
      .post('/auth/registration')
      .send(testUserCreate)
      .expect(201);
    const data = res.body as UserDocument;
    expect(data._id).toBeDefined();
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
  });

  it('[GET]auth/login - success', async () => {
    const res: request.Response = await request(server)
      .post('/auth/login')
      .send(testUserCreate);
    const data = res.body as { user: UserDocument; token: string };
    expect(data.user._id).toBeDefined();
    expect(data.user.createdAt).toBeDefined();
    expect(data.user.updatedAt).toBeDefined();
    expect(data.token).toBeDefined();
  });
});
