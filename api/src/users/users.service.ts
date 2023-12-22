import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }
}
