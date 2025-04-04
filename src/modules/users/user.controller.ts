import { Controller, Post, Req, UseGuards, Get, Delete, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ApiResponse } from "../../utils/apiResponse"
import { UserService } from './user.service';
import { RequestWithUser } from '../auth/auth.interfaces';
import { ValidationGuard } from 'src/guards/validation.guard';
import { createUser, editUser } from './user.schema';
import { PrivilegesEnum } from '../permissions/permissions.enums';
import { ValidatePrivilegesGuard } from 'src/guards/validate-privileges.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/current')
  @UseGuards(JwtAuthGuard)
  async getUserLogueado(@Req() req: RequestWithUser) {
    try {
      const userData = req.user;
      const data = await this.userService.findByEmail(userData.email);
      return ApiResponse.success('Consultado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  @ValidatePrivilegesGuard([PrivilegesEnum.VER_USUARIOS])
  async getAllUsers() {
    try {
      const data = await this.userService.getAllUsers();
      return ApiResponse.success('Consultado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ValidatePrivilegesGuard([PrivilegesEnum.VER_USUARIOS])
  async getUser(@Req() req: RequestWithUser) {
    try {
      const data = await this.userService.getUserById(req.params.id);
      return ApiResponse.success('Consultado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ValidatePrivilegesGuard([PrivilegesEnum.ELIMINAR_USUARIOS])
  async deleteUser(@Req() req: RequestWithUser) {
    try {
      const data = await this.userService.deleteUser(req.params.id);
      return ApiResponse.success('Eliminado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(new ValidationGuard(editUser))
  @ValidatePrivilegesGuard([PrivilegesEnum.EDITAR_USUARIOS])
  async editUser(@Req() req: RequestWithUser) {
    try {
      const data = await this.userService.editUser(req.body, req.params.id, req.user.id);
      return ApiResponse.success('Actualizado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @UseGuards(new ValidationGuard(createUser))
  @ValidatePrivilegesGuard([PrivilegesEnum.CREAR_USUARIOS])
  async createUser(@Req() req: RequestWithUser) {
    try {
      const data = await this.userService.createUser(req.body, req.user.id);
      return ApiResponse.success('Guardado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

}
