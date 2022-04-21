import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeAuthService = {
      // signup(email: string, password: string): Promise<User> {},
      signin(email: string, password: string): Promise<User> {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };
    fakeUsersService = {
      find(email: string): Promise<User[]> {
        return Promise.resolve([
          {
            id: 1,
            email,
            password: 'qweqe',
          } as User,
        ]);
      },
      findOne(id: number): Promise<User> {
        return Promise.resolve({
          id,
          email: 'qwe@was',
          password: 'qweqe',
        } as User);
      },
      // remove(id: number): Promise<User> {},
      // update(id: number, attrs: Partial<User>): Promise<User> {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('test@user.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@user.com');
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with passed id is not found', async () => {
    fakeUsersService.findOne = (id) => Promise.resolve(null);
    await expect(controller.findUser('1')).rejects.toThrow('user not found');
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -1 };
    const user = await controller.signin(
      { email: 'asd@as.com', password: 'asdasd' },
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
