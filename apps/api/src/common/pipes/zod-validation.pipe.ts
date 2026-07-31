import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { API_ERROR_CODES } from '@taskforge/contracts';
import { ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodType) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const issues = result.error.issues;

      const errors = issues.reduce<Record<string, string>>(
        (acc, { path, message }) => {
          const key = path.join('.');

          acc[key] = message;

          return acc;
        },
        {}
      );

      throw new BadRequestException({
        message: 'Validation failed',
        code: API_ERROR_CODES.VALIDATION_ERROR,
        errors,
      });
    }

    return result.data;
  }
}
