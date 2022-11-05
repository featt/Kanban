import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';

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
}
