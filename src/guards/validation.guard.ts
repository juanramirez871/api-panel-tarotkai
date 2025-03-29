import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { z, ZodSchema } from 'zod';

@Injectable()
export class ValidationGuard implements CanActivate {
  constructor(private schema: ZodSchema) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const dataToValidate = request.body;

    try {
      this.schema.parse(dataToValidate);
      return true;
    } catch (error) {
      throw new BadRequestException(error.errors);
    }
  }
}
