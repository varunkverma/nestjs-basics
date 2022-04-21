import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

// test scope - good for organisation
describe('AuthService', () => {
  let service: AuthService;

  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // create fake copy of usersService

    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        return Promise.resolve(users.filter((user) => user.email === email));
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    // dummy testing DI container
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  // test block
  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hash password', async () => {
    const user = await service.signup('test@user.com', 'qwerty');
    expect(user.password).not.toEqual('qwerty');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs in with an existing email', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     { id: 1, email: 'test@user.com', password: 'as' } as User,
    //   ]);
    await service.signup('test@user.com', 'qwerty');
    await expect(service.signup('test@user.com', 'qwerty')).rejects.toThrow(
      'email in use',
    );
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('test@user.com', 'qwerty')).rejects.toThrow(
      'user not found',
    );
  });

  it('throws if password is invalid', async () => {
    await service.signup('test@user.com', 'password');
    await expect(service.signin('test@user.com', 'qwerty')).rejects.toThrow(
      'incorrect password',
    );
  });

  it('return a user if password is correct', async () => {
    // const storedPassword =
    //   '22ecaeb4cab7244e.c7df54c4df507dd880ca4472557b3cc761ab7004d1ee2f082731373faaffae7f';
    // fakeUsersService.find = (email) =>
    //   Promise.resolve([{ id: 1, email, password: storedPassword } as User]);
    await service.signup('test@user.com', 'password');

    const user = await service.signin('test@user.com', 'password');
    expect(user).toBeDefined();
    // expect(user.password).toBe(storedPassword);
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
    // const user = await service.signup('test@user.com', 'password');
    // console.log(user);
  });
});
