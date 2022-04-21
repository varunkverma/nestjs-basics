import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication system, (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const testEmail = 'test@user3.gmail.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: testEmail,
        password: 'password',
      })
      .expect(201)
      .then((res) => {
        const { email, id } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(testEmail);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const testEmail = 'test@gmail.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: testEmail,
        password: 'password',
      })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body?.email).toEqual(testEmail);
  });
});
