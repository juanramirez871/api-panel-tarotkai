import { Controller, UseGuards, Get, Post, Req, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ApiResponse } from "../../utils/apiResponse"
import { PermissionService } from './permissions.service';
import { RequestWithUser } from '../auth/auth.interfaces';
import { createRole } from './permissions.schema';
import { ValidationGuard } from 'src/guards/validation.guard';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }


  @Get('/roles')
  @UseGuards(JwtAuthGuard)
  async getAllRoles() {
    try {
      const data = await this.permissionService.getAllRoles();
      return ApiResponse.success('Consultado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Post('/role')
  @UseGuards(JwtAuthGuard)
  @UseGuards(new ValidationGuard(createRole))
  async createRole(@Req() req: RequestWithUser) {
    try {
      const data = await this.permissionService.createRole(req.body);
      return ApiResponse.success('Guardado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Delete('/role/:id')
  @UseGuards(JwtAuthGuard)
  async deleteRole(@Req() req: RequestWithUser) {
    try {
      const data = await this.permissionService.deleteRole(req.params.id);
      return ApiResponse.success('Eliminado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

}
