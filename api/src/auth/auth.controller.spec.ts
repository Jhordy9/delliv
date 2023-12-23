/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as request from 'supertest';

describe('AuthController', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    // Mock AuthService
    const mockAuthService = {
      signIn: jest.fn().mockImplementation((email, password) => {
        return { access_token: 'mockJwtToken' };
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    authService = module.get<AuthService>(AuthService);
  });

  it('should return an access token when login is successful', async () => {
    const signInDto = { email: 'user@example.com', password: 'password' };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(signInDto)
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({ access_token: 'mockJwtToken' });

    expect(authService.signIn).toHaveBeenCalledWith(
      signInDto.email,
      signInDto.password,
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
