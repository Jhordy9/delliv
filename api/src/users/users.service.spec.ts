import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const mockUser = {
  email: 'user@example.com',
  password: 'hashedpassword',
  name: 'Test User',
};

jest.mock('bcrypt', () => ({
  hashSync: jest.fn().mockReturnValue('hashedpassword'),
}));

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue(null),
              create: jest.fn().mockResolvedValue(mockUser),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should find a user by email', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValueOnce(mockUser);
      const result = await service.findOne('user@example.com');
      expect(result).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'user@example.com' },
      });
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const newUser = {
        email: 'newuser@example.com',
        password: 'newpassword',
        name: 'New User',
      };
      prismaService.user.create = jest.fn().mockResolvedValueOnce(newUser);

      const result = await service.register(
        newUser.email,
        newUser.password,
        newUser.name,
      );

      expect(bcrypt.hashSync).toHaveBeenCalledWith(newUser.password, 10);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: newUser.email,
          password: expect.any(String),
          name: newUser.name,
        },
        select: {
          email: true,
          name: true,
        },
      });
      expect(result).toEqual(newUser);
    });

    it('should throw a ConflictException if user already exists', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValueOnce(mockUser);

      await expect(
        service.register(mockUser.email, 'password', mockUser.name),
      ).rejects.toThrow(ConflictException);
    });
  });
});
