/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { jwtConstants } from './constants';
import { DeepMockProxy } from 'jest-mock-extended';
import { UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';

const mockUser = {
  id: '1',
  email: 'user@example.com',
  password: 'password',
  name: 'Test User',
  created_at: new Date(),
  updated_at: new Date(),
};

jest.mock('bcrypt', () => {
  return {
    compareSync: jest.fn(() => true),
    signAsync: jest.fn().mockReturnValue('mockJwtToken'),
  };
});

describe('AuthService', () => {
  let authService: AuthService;
  let spyUserService: UsersService;
  let spyJwtService: JwtService;
  let spyPrismaService: DeepMockProxy<PrismaService>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {
            expiresIn: '30d',
          },
        }),
      ],
      providers: [
        AuthService,
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue(mockUser),
            },
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    spyUserService = module.get<UsersService>(UsersService);
    spyJwtService = module.get<JwtService>(JwtService);
    spyPrismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should successfully sign in a user', async () => {
      const result = await authService.signIn('user@example.com', 'password');

      expect(!!result).toBe(true);
    });

    it('should throw an UnauthorizedException if user is not found', async () => {
      spyUserService.findOne = jest.fn().mockResolvedValue(null);

      await expect(
        authService.signIn('nonexistent@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw an UnauthorizedException if password is incorrect', async () => {
      spyUserService.findOne = jest.fn().mockResolvedValue(mockUser);

      jest.mocked(compareSync).mockReturnValue(false);

      await expect(
        authService.signIn('user@example.com', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
