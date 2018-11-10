import { Todo } from 'todo/model/todo.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'user/entity/user.entity';

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  /**
   * Task owner
   */
  @ManyToOne(() => UserEntity)
  public owner: UserEntity;

  /**
   * Task title
   */
  @Column()
  public title: string;

  /**
   * Describes the date assigned to the task
   *
   * Represented as a string for compatability with the model.
   */
  @Column({ type: 'date' })
  public date: string;

  /**
   * Describes the timestamp of task creation
   *
   * Only used in ordering.
   */
  @CreateDateColumn()
  public createdAt: Date;

  /**
   * Convert database entity to model
   */
  public getTodo(): Todo {
    return new Todo({
      id: this.id,
      title: this.title,
      date: this.date,
    });
  }
}
