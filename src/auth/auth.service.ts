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
    try {
      console.log('Login attempt with:', loginDto);
      
      const allUsers = await this.userRepository.find();
      console.log('All users in database:', allUsers);
      
      const user = await this.userRepository.findOne({
        where: { email: loginDto.email },
      });
      
      console.log('Found user:', user);

      if (!user) {
        throw new UnauthorizedException('이메일이 존재하지 않습니다.');
      }

      if (user.password !== loginDto.password) {
        throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
      }

      const payload = { email: user.email, sub: user.idx };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error('Detailed login error:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('로그인 처리 중 오류가 발생했습니다.');
    }
  }
} 