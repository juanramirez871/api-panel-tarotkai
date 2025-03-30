import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { loginSchema } from './auth.schema';
import { ValidationGuard } from 'src/guards/validation.guard';
import { ApiResponse } from "../../utils/apiResponse"

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(new ValidationGuard(loginSchema))
  async login(@Body('email') email: string, @Body('password') password: string)
  {
    try {
      const data = await this.authService.login(email, password);
      return ApiResponse.success('Inicio de sesion exitoso', data);
    }
    catch(error) {
      return ApiResponse.error(error);
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: any) {
    return { message: 'Cierre de sesion exitoso' };
  }
}
