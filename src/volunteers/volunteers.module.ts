import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { VolunteersController } from './volunteers.controller';
import { VolunteersService } from './volunteers.service';
import { Post } from './entities/post.entity';
import { Participant } from './entities/participant.entity';
import { PostOwnerMiddleware } from '../middlewares/post-owner.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Participant]),
    JwtModule.register({
      secret: 'your-secret-key', // 실제 환경에서는 환경변수로 관리하세요
      signOptions: { expiresIn: '1h' },
    }),
  ],
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