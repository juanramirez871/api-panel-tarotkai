import { Controller, Post, Req, UseGuards, Get, Delete, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ApiResponse } from "../../utils/apiResponse"
import { RequestWithUser } from '../auth/auth.interfaces';
import { ValidationGuard } from 'src/guards/validation.guard';
import { TypeCallService } from './type-calls.service';
import { createOrEditTypeCall } from './type-call.schema';

@Controller('user')
export class TypeCallController {
  constructor(private readonly typeCallService: TypeCallService) { }

  @Get('/type-calls')
  @UseGuards(JwtAuthGuard)
  async getTypeCalls() {
    try {
      const data = await this.typeCallService.getTypeCalls();
      return ApiResponse.success('Consultado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Get('/type-call/:idTypeCall')
  @UseGuards(JwtAuthGuard)
  async getTypeCall(@Req() req: RequestWithUser) {
    try {
      const data = await this.typeCallService.getTypeCall(req.params.idTypeCall);
      return ApiResponse.success('Consultado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Delete('/type-calls/:idTypeCall')
  @UseGuards(JwtAuthGuard)
  async deleteTypeCalls(@Req() req: RequestWithUser) {
    try {
      const data = await this.typeCallService.deleteTypeCalls(req.params.idTypeCall);
      return ApiResponse.success('Eliminado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Put('/type-calls/:idTypeCall')
  @UseGuards(JwtAuthGuard)
  @UseGuards(new ValidationGuard(createOrEditTypeCall))
  async editTypeCalls(@Req() req: RequestWithUser) {
    try {
      const data = await this.typeCallService.editTypeCalls(req.params.idTypeCall, req.body);
      return ApiResponse.success('Actualizado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }

  @Post('/type-calls')
  @UseGuards(JwtAuthGuard)
  @UseGuards(new ValidationGuard(createOrEditTypeCall))
  async createTypeCalls(@Req() req: RequestWithUser) {
    try {
      const data = await this.typeCallService.createTypeCalls(req.body);
      return ApiResponse.success('Guardado correctamente', data);
    }
    catch (error) {
      return ApiResponse.error(error);
    }
  }
}
