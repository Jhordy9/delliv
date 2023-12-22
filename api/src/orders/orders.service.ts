import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { db } from 'prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOrders(status: OrderStatus) {
    const orders = await db.order.findMany({
      where: { status },
      select: {
        address: true,
        status: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [{ created_at: 'desc' }],
    });

    return orders.map(({ user, ...order }) => ({
      ...order,
      name: user.name,
    }));
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
