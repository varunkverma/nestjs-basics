import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Param decorator exist outside the DI system, so our decorator can't get an instance of UsersService direclty
// solution: make an interceptor to get the current user, then use the value produced by it in the decorator
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // ExecutionContext is like a wrapper around the incoming request. This enables us to work with requests other than http.

    const request = context.switchToHttp().getRequest(); // get the underlying requesting coming to the application
    return request.currentUser;
  },
);
