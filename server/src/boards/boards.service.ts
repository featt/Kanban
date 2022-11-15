import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { CreateBoardInput } from './dto/create-board.input';
import { Board, User } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) { }

  async create(title: string, userId: User['id']) {
    return await this.prisma.board.create({
      data: {
        title,
        userId,
      },
    });
  }

  async getUserBoards(userId: User['id']) {
    return await this.prisma.user.findFirst({ where: { id: userId } }).boards();
  }

  async findOne(id: Board['id']) {
    return await this.prisma.board.findFirst({
      where: { id },
      include: { tasks: true },
    });
  }

  async getAllTasks(id: Board['id']) {
    return await this.prisma.board.findFirst({ where: { id } }).tasks();
  }
}
