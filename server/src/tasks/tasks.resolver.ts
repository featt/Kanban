import { ChangeStatusInput } from './dto/change-status.input';
import { Board } from './../boards/models/board.model';
import { GqlAuthGuard } from './../auth/gql-auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './models/task.model';
import { CreateTaskInput } from './dto/create-task.input';
import { TaskStatus } from '@prisma/client';
import { UseGuards } from '@nestjs/common/decorators';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Task)
  createTask(@Args('data') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput.title, createTaskInput.boardId);
  }

  @Mutation(() => Task)
  setInProgress(@Args('data') {taskId}: ChangeStatusInput) {
    return this.tasksService.changeStatus(taskId, TaskStatus.IN_PROGRESS)
  }

  @Mutation(() => Task)
  setDone(@Args('data') {taskId}: ChangeStatusInput) {
    return this.tasksService.changeStatus(taskId, TaskStatus.DONE)
  }

  @Mutation(() => Task)
  setNotDone(@Args('data') {taskId}: ChangeStatusInput) {
    return this.tasksService.changeStatus(taskId, TaskStatus.NOT_DONE)
  }
}
