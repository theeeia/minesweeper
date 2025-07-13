import { Resolver, Mutation, Query, Args, Int } from '@nestjs/graphql';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardEntry } from './entities/leaderboard-entry.entity';

@Resolver(() => LeaderboardEntry)
export class LeaderboardResolver {
  constructor(private lb: LeaderboardService) {}

  @Mutation(() => LeaderboardEntry)
  submitScore(
    @Args('initials') initials: string,
    @Args('time', { type: () => Int }) time: number,
  ) {
    return this.lb.submitScore(initials, time);
  }

  @Query(() => [LeaderboardEntry])
  topScores() {
    return this.lb.topScores();
  }
}
