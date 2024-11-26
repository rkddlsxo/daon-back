import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('이메일이 존재하지 않습니다.');
    }

    if (loginDto.password !== user.password.replace('hashed', '')) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const payload = { email: user.email, sub: user.idx };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
} 