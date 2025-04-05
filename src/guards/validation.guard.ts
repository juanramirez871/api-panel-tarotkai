import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ValidationGuard implements CanActivate {
  constructor(private schema: ZodSchema<any>) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const dataToValidate = {
      ...request.body,
      ...request.query,
      ...request.params,
    };

    const result = this.schema.safeParse(dataToValidate);

    if (!result.success) {
      if (request.method === 'POST') {
        const errorsObject: Record<string, string[]> = {};

        result.error.errors.forEach(error => {
          const fieldName = error.path[0] as string;
          const errorMessage = error.message;

          if (!errorsObject[fieldName]) {
            errorsObject[fieldName] = [];
          }

          errorsObject[fieldName].push(`${errorMessage}`);
        });

        throw new BadRequestException({ errors: errorsObject });
      } else {
        const firstError = result.error.errors[0];
        const fieldName = firstError.path[0] as string;
        const errorMessage = firstError.message;

        throw new BadRequestException({
          error: `${fieldName ? ' ' : ''}${errorMessage}`,
        });
      }
    }

    return true;
  }
}
