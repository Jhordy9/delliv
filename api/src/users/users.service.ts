import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async register(email: string, password: string, name: string) {
    const hashedPassword = bcrypt.hashSync(password, 10);

    return await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        email: true,
        name: true,
      },
    });
  }
}
