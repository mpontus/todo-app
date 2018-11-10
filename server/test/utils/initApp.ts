import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from '../../src/app.module';

export const initApp = async () => {
  // Avoid breaking dev environement during tests using separate db
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
  process.env.REDIS_URL = process.env.TEST_REDIS_URL;

  const nestApp = await NestFactory.create(AppModule, { logger: false });
  useContainer(nestApp.select(AppModule), { fallbackOnErrors: true });

  await nestApp.init();

  return {
    expressApp: nestApp.getHttpServer(),
    nestApp,
  };
};
