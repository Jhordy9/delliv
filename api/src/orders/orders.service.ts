import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

type OrderParams = {
  status?: OrderStatus;
  take?: string;
  page?: string;
  search?: string;
};

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOrders(params: OrderParams) {
    const { search, status } = params;
    const take = parseInt(params.take ?? '25');
    const page = parseInt(params.page ?? '1');
    const skip = (page - 1) * take;

    const orders = await this.prismaService.order.findMany({
      where: {
        status,
        user: { name: { contains: search ?? '', mode: 'insensitive' } },
      },
      select: {
        address: true,
        status: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { updated_at: 'desc' },
      take,
      skip,
    });

    const count = await this.prismaService.order.count({
      where: {
        status,
        user: { name: { contains: search ?? '', mode: 'insensitive' } },
      },
    });

    return {
      data: orders.map(({ user, ...order }) => ({
        ...order,
        name: user.name,
      })),
      info: {
        page: page,
        take: take,
        total_pages: Math.ceil(count / take),
        total_items: count,
      },
    };
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    const findedOrder = await this.prismaService.order.findUnique({
      where: { id },
    });

    if (!findedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }

    const order = await this.prismaService.order.update({
      where: { id },
      data: { status },
    });

    return order;
  }
}
