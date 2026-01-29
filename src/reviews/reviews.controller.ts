import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('post/:postId')
  async getPostReviews(@Param('postId') postId: string) {
    return await this.reviewsService.findAllByPost(+postId);
  }

  @Get(':id')
  async getReview(@Param('id') id: string) {
    return await this.reviewsService.findOne(+id);
  }

  @Post('post/:postId')
  @UseGuards(AuthGuard)
  async createReview(
    @Param('postId') postId: string,
    @Request() req,
    @Body() reviewData: { rating: number; review_text: string },
  ) {
    return await this.reviewsService.create(+postId, req.user.idx, reviewData);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateReview(
    @Param('id') id: string,
    @Request() req,
    @Body() updateData: { rating?: number; review_text?: string },
  ) {
    return await this.reviewsService.update(+id, req.user.idx, updateData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteReview(@Param('id') id: string, @Request() req) {
    return await this.reviewsService.remove(+id, req.user.idx);
  }

  @Get()
  async getAllReviews() {
    return await this.reviewsService.findAll();
  }
} 