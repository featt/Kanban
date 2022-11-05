import { Task } from './../../tasks/models/task.model';
import { BaseModel } from 'src/common/models/base.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Board extends BaseModel {
  @Field()
  title: string;

  @Field(() => [Task])
  tasks: Task[]
}
