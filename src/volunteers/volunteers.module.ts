import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteersController } from './volunteers.controller';
import { VolunteersService } from './volunteers.service';
import { Post } from './entities/post.entity';
import { Participant } from './entities/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Participant])],
  controllers: [VolunteersController],
  providers: [VolunteersService],
})
export class VolunteersModule {} 