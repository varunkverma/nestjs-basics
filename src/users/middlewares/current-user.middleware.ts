import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RepositoryNotTreeError } from 'typeorm';
import { User } from '../user.entity';
import { UsersService } from '../users.service';
User;

// add a new property to an existing Interface, in this case Request Interface by express
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleare implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: RepositoryNotTreeError, next: NextFunction) {
    const { userId } = req?.session || {};

    if (userId) {
      const user = await this.usersService.findOne(parseInt(userId));

      req.currentUser = user;
    }
    next();
  }
}
