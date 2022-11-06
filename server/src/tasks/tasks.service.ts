import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(title: string, boardId: number) { 
   return this.prisma.task.create({
      data: {
        title,
        boardId,             
      }
    })
  }

  async getBoardTasks(boardId: number) {
    return await this.prisma.board.findFirst({where: {id: boardId}}).tasks();
  }

  async changeStatus(taskId: number, status: TaskStatus) {
    return await this.prisma.task.update({
      where: {id: taskId},
      data: {
        status
      }
    })
  }
}
