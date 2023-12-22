import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderStatus } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('')
  async getOrders(@Param('status') status: OrderStatus) {
    return await this.ordersService.getOrders(status);
  }

  @Put(':id')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ) {
    return await this.ordersService.updateOrderStatus(id, status);
  }
}
