import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import { AppModule } from './app.module';

/**
 * Entyr point to the applicaiton.
 *
 * Launches HTTP server and queue listeners.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  // Launch the web server
  app.setGlobalPrefix('api');
  await app.listen(parseInt(process.env.PORT || '8080', 10));
}

// tslint:disable-next-line:no-floating-promises
bootstrap();
