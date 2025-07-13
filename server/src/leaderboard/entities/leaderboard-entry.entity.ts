import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class LeaderboardEntry {
  @Field(() => ID) id: string;
  @Field() initials: string;
  @Field(() => Int) time: number;
  @Field() date: Date;
}
