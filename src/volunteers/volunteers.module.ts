import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteersController } from './volunteers.controller';
import { VolunteersService } from './volunteers.service';
import { Post } from './entities/post.entity';
import { Participant } from './entities/participant.entity';
import { PostOwnerMiddleware } from '../middlewares/post-owner.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Participant])],
  controllers: [VolunteersController],
  providers: [VolunteersService],
})
export class VolunteersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PostOwnerMiddleware)
      .forRoutes(
        { path: 'api/volunteers/:id', method: RequestMethod.PUT },
        { path: 'api/volunteers/:id', method: RequestMethod.DELETE }
      );
  }
} 