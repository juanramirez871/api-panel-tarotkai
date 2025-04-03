import { Controller, Post, Req, UseGuards, Get, Delete, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ApiResponse } from "../../utils/apiResponse"
import { RequestWithUser } from '../auth/auth.interfaces';
import { ValidationGuard } from 'src/guards/validation.guard';
import { TypeCallService } from './type-calls.service';
import { createOrEditTypeCall } from './type-call.schema';
import { ValidatePrivilegesGuard } from 'src/guards/validate-privileges.guard';
import { PrivilegesEnum } from '../permissions/permissions.enums';

@Controller('type-calls')
export class TypeCallController {
  constructor(private readonly typeCallService: TypeCallService) { }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ValidatePrivilegesGuard([PrivilegesEnum.VER_TIPOS_LLAMADAS])
  async getTypeCalls() {
    try {
      const data = await this.typeCallService.getTypeCalls();
      return ApiResponse.success('Consultado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Get('/:idTypeCall')
  @UseGuards(JwtAuthGuard)
  @ValidatePrivilegesGuard([PrivilegesEnum.VER_TIPOS_LLAMADAS])
  async getTypeCall(@Req() req: RequestWithUser) {
    try {
      const data = await this.typeCallService.getTypeCall(req.params.idTypeCall);
      return ApiResponse.success('Consultado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Delete('/:idTypeCall')
  @UseGuards(JwtAuthGuard)
  @ValidatePrivilegesGuard([PrivilegesEnum.ELIMINAR_TIPOS_LLAMADAS])
  async deleteTypeCalls(@Req() req: RequestWithUser) {
    try {
      const data = await this.typeCallService.deleteTypeCalls(req.params.idTypeCall);
      return ApiResponse.success('Eliminado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Put('/:idTypeCall')
  @UseGuards(JwtAuthGuard)
  @UseGuards(new ValidationGuard(createOrEditTypeCall))
  @ValidatePrivilegesGuard([PrivilegesEnum.EDITAR_TIPOS_LLAMADAS])
  async editTypeCalls(@Req() req: RequestWithUser) {
    try {
      const data = await this.typeCallService.editTypeCalls(req.params.idTypeCall, req.body, req.user.id);
      return ApiResponse.success('Actualizado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @UseGuards(new ValidationGuard(createOrEditTypeCall))
  @ValidatePrivilegesGuard([PrivilegesEnum.CREAR_TIPOS_LLAMADAS])
  async createTypeCalls(@Req() req: RequestWithUser) {
    try {
      const data = await this.typeCallService.createTypeCalls(req.body, req.user.id);
      return ApiResponse.success('Guardado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }
}
