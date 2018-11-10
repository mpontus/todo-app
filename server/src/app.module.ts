import { Module } from '@nestjs/common';
import { AuthModule } from 'auth/auth.module';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { TodoModule } from 'todo/todo.module';
import { UserModule } from 'user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Application Module
 *
 * Responsible for bootstrapping the application
 */
@Module({
  imports: [
    AuthModule,
    UserModule,
    TodoModule,
    TypeOrmModule.forRoot(),
    ConfigModule.load(path.resolve(__dirname, 'config/**/*.{ts,js}')),
  ],
})
export class AppModule {}
