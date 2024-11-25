import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MypageModule } from './mypage/mypage.module';
import { VolunteersModule } from './volunteers/volunteers.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BoardModule } from './board/board.module';
import { RecruitModule } from './recruit/recruit.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MypageModule,
    VolunteersModule,
    ReviewsModule,
    BoardModule,
    RecruitModule,
    AuthModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AppModule { }
