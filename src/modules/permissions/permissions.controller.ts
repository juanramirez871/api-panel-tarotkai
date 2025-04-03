import { Controller, UseGuards, Get, Post, Req, Delete, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ApiResponse } from "../../utils/apiResponse"
import { PermissionService } from './permissions.service';
import { RequestWithUser } from '../auth/auth.interfaces';
import { createRole } from './permissions.schema';
import { ValidationGuard } from 'src/guards/validation.guard';
import { PrivilegesEnum } from './permissions.enums';
import { ValidatePrivilegesGuard } from 'src/guards/validate-privileges.guard';

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
  @ValidatePrivilegesGuard([PrivilegesEnum.CREAR_ROLES])
  async createRole(@Req() req: RequestWithUser) {
    try {
      const data = await this.permissionService.createRole(req.body, req.user.id);
      return ApiResponse.success('Guardado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Delete('/role/:id')
  @UseGuards(JwtAuthGuard)
  @ValidatePrivilegesGuard([PrivilegesEnum.ELIMINAR_ROLES])
  async deleteRole(@Req() req: RequestWithUser) {
    try {
      const data = await this.permissionService.deleteRole(req.params.id);
      return ApiResponse.success('Eliminado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Get('/roles/:idRole/modules')
  @UseGuards(JwtAuthGuard)
  async getAllModulesWithPrivileges(@Req() req: RequestWithUser) {
    try {
      const data = await this.permissionService.getAllModulesWithPrivileges(req.params.idRole);
      return ApiResponse.success('Consultado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Put('/roles/:idRole/privilege/:idPrivilege')
  @UseGuards(JwtAuthGuard)
  @ValidatePrivilegesGuard([PrivilegesEnum.MODIFICAR_PRIVILEGIOS])
  async changePrivilegeRole(@Req() req: RequestWithUser) {
    try {
      const data = await this.permissionService.changePrivilegeRole(
        req.params.idRole,
        req.params.idPrivilege,
        req.user.id
      );
      return ApiResponse.success('Actualizado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

}
