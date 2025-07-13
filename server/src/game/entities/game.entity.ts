import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
class GameState {
  @Field(() => [String])
  mines!: string[];

  @Field(() => [String])
  revealed!: string[];

  @Field(() => [String])
  flagged!: string[];
}

@ObjectType()
export class Game {
  @Field(() => ID) id: string;
  @Field() createdAt: Date;
  @Field() updatedAt: Date;
  @Field(() => GameState)
  state!: GameState;
  @Field(() => Int) elapsedTime: number;
  @Field() isFinished: boolean;
}
