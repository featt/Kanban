import { IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @Field()
  login: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
