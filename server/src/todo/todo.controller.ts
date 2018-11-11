import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'common/guards/auth.guard';
import { IRequest } from 'common/interface/IRequest';
import { CreateTodoDto } from './model/create-todo-dto.model';
import { TodoListing } from './model/todo-listing.model';
import { Todo } from './model/todo.model';
import { UpdateTodoDto } from './model/update-todo-dto.model';
import { TodoSerivce } from './todo.service';
import { TodoListingCriteria } from './model/todo-listing-criteria.model';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoSerivce) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoListing })
  public async getTodos(
    @Req() req: IRequest,
    @Query() { date, skip = 0, take = 10 }: TodoListingCriteria,
  ): Promise<TodoListing> {
    return this.todoService.getTodos(req.user, { date, skip, take });
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Todo })
  public async createTodo(
    @Req() req: IRequest,
    body: CreateTodoDto,
  ): Promise<Todo> {
    return this.todoService.createTodo(req.user, body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Todo })
  public async updateTodo(
    @Req() req: IRequest,
    @Param('id') id: string,
    @Body() body: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTodo(req.user, id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  public async deleteTodo(
    @Req() req: IRequest,
    @Param('id') id: string,
  ): Promise<void> {
    return this.todoService.deleteTodo(req.user, id);
  }
}
