import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Delete,
  Req,
  Post,
} from '@nestjs/common';
import { IRequest } from 'common/interface/IRequest';
import { TodoSerivce } from './todo.service';
import { Todo } from './model/todo.model';
import { Pagination } from 'common/model/pagination.model';
import { ITodoUpdate } from './interfaces/todo-update.interface';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoSerivce) {}

  @Get()
  public async getTodos(@Req() req: IRequest): Promise<Pagination<Todo>> {
    return this.todoService.getTodos(req.user, {});
  }

  @Post()
  public async createTodo(@Req() req: IRequest, body: ITodoUpdate) {
    return this.todoService.createTodo(req.user, body);
  }

  @Patch(':id')
  public async updateTodo(
    @Req() req: IRequest,
    @Param('id') id: string,
    @Body() body: ITodoUpdate,
  ): Promise<Todo> {
    return this.todoService.updateTodo(req.user, id, body);
  }

  @Delete(':id')
  public async deleteTodo(@Req() req: IRequest, @Param('id') id: string) {
    return this.todoService.deleteTodo(req.user, id);
  }
}
