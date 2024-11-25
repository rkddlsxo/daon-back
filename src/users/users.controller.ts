import { Controller, Post, Body, Session, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userData: { 
    username: string; 
    password: string; 
    email: string; 
    phone?: string 
  }) {
    const user = await this.usersService.register(userData);
    const { password, ...result } = user;
    return result;
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() credentials: { username: string; password: string },
    @Session() session: any
  ) {
    const user = await this.usersService.validateUser(
      credentials.username,
      credentials.password
    );
    session.userId = user.idx;
    return user;
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Session() session: any) {
    session.destroy();
    return { message: 'Logged out successfully' };
  }
} 