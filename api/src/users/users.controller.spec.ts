import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as request from 'supertest';

describe('UsersController', () => {
  let app: INestApplication;
  let usersService: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      register: jest.fn().mockImplementation((email, password, name) => {
        return { id: 'some-unique-id', email, name };
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(UsersController).toBeDefined();
  });

  it('should register a user and return user data', async () => {
    const registerDto = {
      email: 'newuser@example.com',
      password: 'strongpassword',
      name: 'New User',
    };

    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send(registerDto)
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'newuser@example.com',
      name: 'New User',
    });

    expect(usersService.register).toHaveBeenCalledWith(
      registerDto.email,
      registerDto.password,
      registerDto.name,
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
