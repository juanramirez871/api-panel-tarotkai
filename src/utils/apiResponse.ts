import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ApiResponse {
  static success(message: string, data: any = null, statusCode: HttpStatus = HttpStatus.OK) {
    return {
      statusCode,
      message,
      data,
    };
  }

  static error(error: any, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw new HttpException({ statusCode, error: errorMessage }, statusCode);
  }
}
