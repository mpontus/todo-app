import {
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'common/guards/auth.guard';
import { Principal } from 'common/model/principal.model';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { CreateTodoDto } from './model/create-todo-dto.model';
import { TodoListingCriteria } from './model/todo-listing-criteria.model';
import { TodoListing } from './model/todo-listing.model';
import { Todo } from './model/todo.model';
import { UpdateTodoDto } from './model/update-todo-dto.model';

export class TodoSerivce {
  constructor(private readonly todoRepository: Repository<TodoEntity>) {}

  public async getTodos(
    actor: Principal,
    spec: TodoListingCriteria,
  ): Promise<TodoListing> {
    const [items, total] = await this.todoRepository.findAndCount({
      where: {
        owner: { id: actor.id },
        date: spec.date,
      },
      take: spec.take,
      skip: spec.skip,
    });

    return new TodoListing(total, items.map(item => item.getTodo()));
  }

  @UseGuards(AuthGuard)
  public async createTodo(
    actor: Principal,
    data: CreateTodoDto,
  ): Promise<Todo> {
    const todoEntity = this.todoRepository.create({
      owner: { id: actor.id },
      title: data.title,
      date: data.date,
    });

    await this.todoRepository.save(todoEntity);

    return todoEntity.getTodo();
  }

  public async updateTodo(
    actor: Principal,
    id: string,
    data: UpdateTodoDto,
  ): Promise<Todo> {
    const todoEntity = await this.getTodoEntity(actor, id);

    Object.assign(todoEntity, data);

    return todoEntity.getTodo();
  }

  public async deleteTodo(actor: Principal, id: string): Promise<void> {
    const todoEntity = await this.getTodoEntity(actor, id);

    await this.todoRepository.remove(todoEntity);
  }

  private async getTodoEntity(
    actor: Principal,
    id: string,
  ): Promise<TodoEntity> {
    const todoEntity = await this.todoRepository.findOne(id);

    if (todoEntity === undefined) {
      throw new NotFoundException();
    }

    if (todoEntity.owner.id !== actor.id) {
      throw new ForbiddenException();
    }

    return todoEntity;
  }
}
