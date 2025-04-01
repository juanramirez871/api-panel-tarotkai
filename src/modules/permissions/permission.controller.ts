import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ApiResponse } from "../../utils/apiResponse"
import { PermissionService } from './permissions.service';

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

}
