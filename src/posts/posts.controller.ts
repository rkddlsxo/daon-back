import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    console.log('GET /api/posts called');
    return this.postsService.findAll();
  }

  @Post()
  async create(@Body() createPostDto: any) {
    return this.postsService.create(createPostDto);
  }
} 