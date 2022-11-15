import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetBoardInput {
  @Field()
  boardId: string;
}
