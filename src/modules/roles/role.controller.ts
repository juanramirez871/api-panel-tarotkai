import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ApiResponse } from "../../utils/apiResponse"
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }


  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    try {
      const data = await this.roleService.getAllRoles();
      return ApiResponse.success('Consultado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

}
