import { Injectable, NestMiddleware, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../volunteers/entities/post.entity';

declare global {
  namespace Express {
    interface Request {
      user?: {
        idx: number;
      };
    }
  }
}

@Injectable()
export class PostOwnerMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const postId = parseInt(req.params.id);
    const userId = req.user?.idx;

    // 게시물 존재 여부 확인
    const post = await this.postRepository.findOne({
      where: { idx: postId }
    });

    if (!post) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    // 작성자 일치 여부 확인
    if (post.writer_idx !== userId) {
      throw new ForbiddenException('자신의 게시물만 수정/삭제할 수 있습니다.');
    }

    next();
  }
} 