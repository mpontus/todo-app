import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from 'auth/auth.module';
import cors from 'cors';
import { TodoModule } from 'todo/todo.module';
import { UserModule } from 'user/user.module';
import { AppModule } from './app.module';

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

  const document = SwaggerModule.createDocument(app, options, {
    include: [AuthModule, UserModule, TodoModule],
  });

  SwaggerModule.setup('swagger', app, document);

  await app.listen(parseInt(process.env.PORT || '8080', 10));
}

// tslint:disable-next-line:no-floating-promises
bootstrap();
