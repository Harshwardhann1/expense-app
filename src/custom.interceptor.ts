import {
  NestInterceptor,
  CallHandler,
} from '@nestjs/common/interfaces/features/nest-interceptor.interface';
import { ExecutionContext } from '@nestjs/common';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    return handler.handle().pipe(
      map((data) => {
        const response = {
          ...data,
          createdAt: data.created_at,
        };
        delete response.updated_at;
        delete response.created_at;

        return response;
      }),
    );
  }
}
