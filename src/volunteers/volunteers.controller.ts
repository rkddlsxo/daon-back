import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/volunteers')
export class VolunteersController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @Get()
  async getAllPosts() {
    return await this.volunteersService.findAll();
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return await this.volunteersService.findOne(+id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createPost(@Request() req, @Body() postData: any) {
    return await this.volunteersService.create(req.user.idx, postData);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updatePost(
    @Param('id') id: string,
    @Request() req,
    @Body() updateData: any,
  ) {
    return await this.volunteersService.update(+id, req.user.idx, updateData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePost(@Param('id') id: string, @Request() req) {
    return await this.volunteersService.remove(+id, req.user.idx);
  }

  @Post(':id/participate')
  @UseGuards(AuthGuard)
  async participateInPost(@Param('id') id: string, @Request() req) {
    return await this.volunteersService.participate(+id, req.user.idx);
  }

  @Delete(':id/participate')
  @UseGuards(AuthGuard)
  async cancelParticipation(@Param('id') id: string, @Request() req) {
    return await this.volunteersService.cancelParticipation(+id, req.user.idx);
  }
} 