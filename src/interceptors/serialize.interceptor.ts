import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {}; // represents any type of class
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // // Run something before a request is handled by the request handler
    // console.log('Running before the handler', context);
    return next.handle().pipe(
      map((data: any) => {
        // run something before the response is sent out
        // console.log('running before the response is sent out', data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, // removes fields not marked with Expose decorator
        });
      }),
    );
  }
}
