import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Participant } from './entities/participant.entity';

@Injectable()
export class VolunteersService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,
  ) {}

  // 봉사활동 목록 조회
  async findAll() {
    return await this.postsRepository.find({
      relations: ['writer', 'participants'],
    });
  }

  // 봉사활동 상세 조회
  async findOne(idx: number) {
    const post = await this.postsRepository.findOne({
      where: { idx },
      relations: ['writer', 'participants', 'participants.user'],
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  // 봉사활동 등록
  async create(userId: number, postData: any) {
    const post = this.postsRepository.create({
      ...postData,
      writer_idx: userId,
    });
    return await this.postsRepository.save(post);
  }

  // 봉사활동 수정
  async update(idx: number, userId: number, updateData: any) {
    const post = await this.postsRepository.findOne({
      where: { idx, writer_idx: userId },
    });
    if (!post) throw new NotFoundException('Post not found or unauthorized');
    
    Object.assign(post, updateData);
    return await this.postsRepository.save(post);
  }

  // 봉사활동 삭제
  async remove(idx: number, userId: number) {
    const post = await this.postsRepository.findOne({
      where: { idx, writer_idx: userId },
    });
    if (!post) throw new NotFoundException('Post not found or unauthorized');
    
    await this.postsRepository.remove(post);
    return { message: 'Post deleted successfully' };
  }

  // 봉사활동 참여
  async participate(postIdx: number, userId: number) {
    const post = await this.postsRepository.findOne({
      where: { idx: postIdx },
      relations: ['participants'],
    });
    
    if (!post) throw new NotFoundException('Post not found');
    
    if (post.participants.length >= post.max_participants) {
      throw new BadRequestException('Maximum participants reached');
    }

    const existingParticipation = await this.participantsRepository.findOne({
      where: { post_idx: postIdx, user_idx: userId },
    });

    if (existingParticipation) {
      throw new BadRequestException('Already participating');
    }

    const participant = this.participantsRepository.create({
      post_idx: postIdx,
      user_idx: userId,
    });

    return await this.participantsRepository.save(participant);
  }

  // 봉사활동 참여 취소
  async cancelParticipation(postIdx: number, userId: number) {
    const participation = await this.participantsRepository.findOne({
      where: { post_idx: postIdx, user_idx: userId },
    });

    if (!participation) {
      throw new NotFoundException('Participation not found');
    }

    await this.participantsRepository.remove(participation);
    return { message: 'Participation cancelled successfully' };
  }
}