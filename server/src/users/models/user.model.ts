import { Board } from './../../boards/models/board.model';
import 'reflect-metadata';
import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class User extends BaseModel {
  @Field()
  login: string;

  @HideField()
  password: string;

  @Field(() => Board)
  boards: Board[];
}
