import { Board } from './../../boards/models/board.model';
import { ObjectType, Field, } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { TaskStatus } from '@prisma/client';

@ObjectType()
export class Task extends BaseModel {
  @Field()
  title: string;

  @Field()
  boardId: string;

  @Field()  
  status: string
}
