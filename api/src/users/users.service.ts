import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async register(email: string, password: string, name: string) {
    if (password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters');
    }

    const hashedPassword = hashSync(password, 10);

    const findUser = await this.findOne(email);

    if (findUser) {
      throw new ConflictException('User already exists with this email');
    }

    const registeredUser = await this.prismaService.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
      },
      select: {
        email: true,
        name: true,
      },
    });

    return registeredUser;
  }
}
