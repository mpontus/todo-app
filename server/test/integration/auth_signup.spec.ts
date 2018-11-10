import supertest from 'supertest';
import { initApp } from '../utils/initApp';
import { resetDb } from '../utils/resetDb';

let expressApp: any;
let nestApp: any;

beforeAll(async () => {
  ({ expressApp, nestApp } = await initApp());
});

afterAll(() => nestApp.close());

beforeEach(resetDb);

describe('signup', () => {
  const authSeed = require('../seeds/anonymous_user');

  beforeEach(() => authSeed.run());

  describe('when the user does not exist', () => {
    it('should be successful', async () => {
      const response = await supertest(expressApp)
        .post('/auth/signup')
        .send({
          username: 'Hailee58',
          password: '9O_8ywUKpHuHjnZ',
        })
        .set('Authorization', `Bearer ${authSeed.token}`)
        .expect(201);

      expect(response.body).toMatchSnapshot({
        token: expect.any(String),
        user: expect.objectContaining({
          id: authSeed.id,
          username: 'Hailee58',
        }),
      });
    });
  });

  describe('when the username is missing', () => {
    it('should be an error', async () => {
      const response = await supertest(expressApp)
        .post('/auth/signup')
        .send({
          password: '9O_8ywUKpHuHjnZ',
        })
        .set('Authorization', `Bearer ${authSeed.token}`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when username is already taken', () => {
    const seed = require('../seeds/registered_user');

    beforeEach(() => seed.run());

    it('should be an error', async () => {
      const response = await supertest(expressApp)
        .post('/auth/signup')
        .send({
          name: seed.username,
          password: '9O_8ywUKpHuHjnZ',
        })
        .set('Authorization', `Bearer ${authSeed.token}`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when the username is too long', () => {
    it('should be an error', async () => {
      const response = await supertest(expressApp)
        .post('/auth/signup')
        .send({
          username: 'x'.repeat(1000),
          password: '9O_8ywUKpHuHjnZ',
        })
        .set('Authorization', `Bearer ${authSeed.token}`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when the password is missing', () => {
    it('should be an error', async () => {
      const response = await supertest(expressApp)
        .post('/auth/signup')
        .send({
          username: 'Hailee58',
        })
        .set('Authorization', `Bearer ${authSeed.token}`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when the password is too short', () => {
    it('should be an error', async () => {
      const response = await supertest(expressApp)
        .post('/auth/signup')
        .send({
          username: 'Hailee58',
          password: 'foo',
        })
        .set('Authorization', `Bearer ${authSeed.token}`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
