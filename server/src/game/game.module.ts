import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({ imports: [PrismaModule], providers: [GameService, GameResolver] })
export class GameModule {}
