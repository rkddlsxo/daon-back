import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      // 디버깅을 위한 로그 추가
      console.log('로그인 요청 데이터:', loginDto);
      
      const result = await this.authService.login(loginDto);
      console.log('로그인 성공:', result);
      return result;
    } catch (error) {
      // 자세한 에러 로깅
      console.error('로그인 처리 중 에러:', error);
      throw error;
    }
  }
} 