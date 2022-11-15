import { GqlAuthGuard } from './../auth/gql-auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './models/board.model';
import { CreateBoardInput } from './dto/create-board.input';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { GetBoardInput } from './dto/get-board.input';

@Resolver(() => Board)
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) { }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Board])
  async createBoard(
    @Args('data') createBoardInput: CreateBoardInput,
    @UserEntity() user: User
  ) {
    await this.boardsService.create(createBoardInput.title, user.id);
    return await this.boardsService.getUserBoards(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Board])
  async getUserBoards(@UserEntity() user: User) {
    return await this.boardsService.getUserBoards(user.id);
  }

  @Query(() => Board, { name: 'board' })
  async findOne(@Args('data') input: GetBoardInput) {
    return await this.boardsService.findOne(input.boardId);
  }

  @Mutation(() => Board)
  updateBoard() {
    return '';
  }

  @Mutation(() => Board)
  removeBoard(@Args('id', { type: () => String }) id: string) {
    return '';
  }
}
