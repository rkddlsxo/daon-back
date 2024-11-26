import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: any) {
    try {
      console.log('Received data:', createPostDto);
      
      const post = this.postRepository.create({
        title: createPostDto.title,
        activity_type: createPostDto.category,
        location: createPostDto.location,
        activity_date: createPostDto.date,
        max_participants: parseInt(createPostDto.maxParticipants),
        description: createPostDto.description || '',
        writer_idx: 1
      });

      console.log('Mapped post data:', post);
      const savedPost = await this.postRepository.save(post);
      console.log('Saved post:', savedPost);
      return savedPost;
    } catch (error) {
      console.error('Error saving post:', error);
      throw new InternalServerErrorException('게시글 생성에 실패했습니다.');
    }
  }

  async findAll() {
    try {
      console.log('Finding all posts...');
      const posts = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.writer', 'writer')
        .select([
          'post.idx',
          'post.title',
          'post.activity_type',
          'post.description',
          'post.max_participants',
          'post.activity_date',
          'post.location',
          'post.created_at',
          'writer.idx',
          'writer.username'
        ])
        .orderBy('post.created_at', 'DESC')
        .getMany();

      console.log('Found posts:', posts);
      return posts;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new InternalServerErrorException('봉사활동 목록을 불러오는데 실패했습니다.');
    }
  }
} 