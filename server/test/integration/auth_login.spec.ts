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

describe('login', () => {
  const seed = require('../seeds/registered_user');

  beforeEach(() => seed.run());

  describe('when credentials are correct', () => {
    it('should be successful', async () => {
      const response = await supertest(expressApp)
        .post('/auth/login')
        .send({
          username: seed.username,
          password: seed.password,
        })
        .expect(201);

      expect(response.body).toMatchSnapshot({
        token: expect.any(String),
      });
    });
  });

  describe('when the user does not exist', () => {
    it('should be an error', async () => {
      const response = await supertest(expressApp)
        .post('/auth/login')
        .send({
          username: 'nfisher@yahoo.com',
          password: seed.password,
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when password is invalid', () => {
    it('should be an error', async () => {
      const response = await supertest(expressApp)
        .post('/auth/login')
        .send({
          username: seed.username,
          password: '^u&Mt3&I52',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
