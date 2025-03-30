import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ApiResponse } from "../../utils/apiResponse"
import { UserService } from './user.service';
import { RequestWithUser } from '../auth/auth.interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: RequestWithUser)
  {
    try {
      const userData = req.user;
      const data = this.userService.getUserById(userData.id);
      return ApiResponse.success('Consultado correctamente', data);
    }
    catch(error) {
      return ApiResponse.error(error);
    }
  }

}
