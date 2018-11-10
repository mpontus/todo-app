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

describe('anonymous authentication', () => {
  it('should be successful', async () => {
    const response = await supertest(expressApp)
      .post('/auth/anonymous')
      .expect(201);

    expect(response.body).toMatchSnapshot({
      token: expect.any(String),
    });
  });
});
