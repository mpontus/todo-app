import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cors from 'cors';
import { AppModule } from './app.module';
import { AuthModule } from 'auth/auth.module';
import { UserModule } from 'user/user.module';

/**
 * Entyr point to the applicaiton.
 *
 * Launches HTTP server and queue listeners.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  const options = new DocumentBuilder()
    .setTitle('Todo App API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const catDocument = SwaggerModule.createDocument(app, options, {
    include: [AuthModule, UserModule],
  });
  SwaggerModule.setup('swagger', app, catDocument);

  await app.listen(parseInt(process.env.PORT || '8080', 10));
}

// tslint:disable-next-line:no-floating-promises
bootstrap();
