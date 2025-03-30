import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ApiResponse } from "../../utils/apiResponse"
import { UserService } from './user.service';
import { RequestWithUser } from '../auth/auth.interfaces';
import { ValidationGuard } from 'src/guards/validation.guard';
import { createUser } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/current')
  @UseGuards(JwtAuthGuard)
  async getUserLogueado(@Req() req: RequestWithUser)
  {
    try {
      const userData = req.user;
      const data = await this.userService.findByEmail(userData.email);
      return ApiResponse.success('Consultado correctamente', data);
    }
    catch(error) {
      return ApiResponse.error(error);
    }
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getAllUsers()
  {
    try {
      const data = await this.userService.getAllUsers();
      return ApiResponse.success('Consultado correctamente', data);
    }
    catch(error) {
      return ApiResponse.error(error);
    }
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @UseGuards(new ValidationGuard(createUser))
  async createUser(@Req() req: RequestWithUser)
  {
    try {
      const data = await this.userService.createUser(req.body);
      return ApiResponse.success('Guardado correctamente', data);
    }
    catch(error) {
      return ApiResponse.error(error);
    }
  }

}
