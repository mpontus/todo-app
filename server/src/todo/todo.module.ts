import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { TodoEntity } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodoSerivce } from './todo.service';

/**
 * Todo Module
 *
 * Responsible for access to task records
 */
@Module({
  controllers: [TodoController],
  providers: [TodoSerivce],
  imports: [TypeOrmModule.forFeature([TodoEntity]), AuthModule],
})
export class TodoModule {}
