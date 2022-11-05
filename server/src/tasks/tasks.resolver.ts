import { Board } from './../boards/models/board.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './models/task.model';
import { CreateTaskInput } from './dto/create-task.input';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Mutation(() => Task)
  createTask(@Args('data') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput.title, createTaskInput.boardId);
  }
}
