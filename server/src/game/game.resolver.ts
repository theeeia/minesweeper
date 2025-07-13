import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';

@Resolver(() => Game)
export class GameResolver {
  constructor(private gameService: GameService) {}

  @Mutation(() => Game)
  startGame() {
    return this.gameService.startGame();
  }

  @Mutation(() => Game)
  revealCell(
    @Args('gameId') gameId: string,
    @Args('x', { type: () => Int }) x: number,
    @Args('y', { type: () => Int }) y: number,
  ) {
    return this.gameService.revealCell(gameId, x, y);
  }

  @Mutation(() => Game)
  toggleFlag(
    @Args('gameId') gameId: string,
    @Args('x', { type: () => Int }) x: number,
    @Args('y', { type: () => Int }) y: number,
  ) {
    return this.gameService.toggleFlag(gameId, x, y);
  }
}
