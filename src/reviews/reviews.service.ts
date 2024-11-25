import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Participant } from '../volunteers/entities/participant.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,
  ) {}

  // 봉사활동의 모든 후기 조회
  async findAllByPost(postIdx: number) {
    return await this.reviewsRepository.find({
      where: { post_idx: postIdx },
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  // 특정 후기 조회
  async findOne(idx: number) {
    const review = await this.reviewsRepository.findOne({
      where: { idx },
      relations: ['user', 'post'],
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  // 후기 작성
  async create(postIdx: number, userId: number, reviewData: { rating: number; review_text: string }) {
    // 참여자 확인
    const participation = await this.participantsRepository.findOne({
      where: { post_idx: postIdx, user_idx: userId },
    });
    
    if (!participation) {
      throw new BadRequestException('You must participate in the activity to write a review');
    }

    // 이미 작성한 후기가 있는지 확인
    const existingReview = await this.reviewsRepository.findOne({
      where: { post_idx: postIdx, user_idx: userId },
    });

    if (existingReview) {
      throw new BadRequestException('You have already written a review for this activity');
    }

    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    const review = this.reviewsRepository.create({
      post_idx: postIdx,
      user_idx: userId,
      ...reviewData,
    });

    return await this.reviewsRepository.save(review);
  }

  // 후기 수정
  async update(idx: number, userId: number, updateData: { rating?: number; review_text?: string }) {
    const review = await this.reviewsRepository.findOne({
      where: { idx, user_idx: userId },
    });

    if (!review) {
      throw new NotFoundException('Review not found or unauthorized');
    }

    if (updateData.rating && (updateData.rating < 1 || updateData.rating > 5)) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    Object.assign(review, updateData);
    return await this.reviewsRepository.save(review);
  }

  // 후기 삭제
  async remove(idx: number, userId: number) {
    const review = await this.reviewsRepository.findOne({
      where: { idx, user_idx: userId },
    });

    if (!review) {
      throw new NotFoundException('Review not found or unauthorized');
    }

    await this.reviewsRepository.remove(review);
    return { message: 'Review deleted successfully' };
  }
} 