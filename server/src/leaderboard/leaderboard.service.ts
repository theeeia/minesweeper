import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async submitScore(initials: string, time: number) {
    return this.prisma.leaderboardEntry.create({ data: { initials, time } });
  }

  async topScores() {
    return this.prisma.leaderboardEntry.findMany({
      orderBy: { time: 'asc' },
      take: 10,
    });
  }
}
