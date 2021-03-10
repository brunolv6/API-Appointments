
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Bruno',
      email: 'brunolv6@gmail.com',
      password: '123'
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Bruno')
  });

  it('should not be able to create a new user with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Bruno',
      email: 'brunolv999@gmail.com',
      password: '123'
    });

    expect(createUser.execute({
      name: 'Laura',
      email: 'brunolv999@gmail.com',
      password: '123'
    })).rejects.toBeInstanceOf(AppError);
  })
})
