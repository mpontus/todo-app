import { IPagination } from 'common/interface/pagination.interface';
import { TodoModule } from 'todo/todo.module';
import { Todo } from './todo.model';
import { ApiExcludeEndpoint, ApiModelProperty } from '@nestjs/swagger';

export class TodoListing implements IPagination<Todo> {
  @ApiModelProperty()
  public total: number;

  @ApiModelProperty({ isArray: true, type: Todo })
  public items: Todo[];

  constructor(total: number, items: Todo[]) {
    this.total = total;
    this.items = items;
  }
}
