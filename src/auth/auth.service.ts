import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: { email: string; password: string }) {
    const user = await this.userRepository.findOne({ 
      where: { email: loginDto.email } 
    });

    if (!user) {
      throw new UnauthorizedException('이메일이 존재하지 않습니다.');
    }

    if (loginDto.password !== user.password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const payload = { email: user.email, sub: user.idx };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
} 