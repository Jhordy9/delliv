import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from 'src/prisma.service';
import { OrderStatus } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  order: {
    findMany: jest.fn(),
    count: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('OrdersService', () => {
  let service: OrdersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOrders', () => {
    it('should return orders and pagination info', async () => {
      const mockOrders = [
        {
          address: '123',
          status: OrderStatus.PENDING,
          user: { name: 'John Doe' },
        },
      ];
      const mockCount = 1;
      const params = {
        status: OrderStatus.PENDING,
        take: '10',
        page: '1',
        search: 'John',
      };

      mockPrismaService.order.findMany.mockResolvedValue(mockOrders);
      mockPrismaService.order.count.mockResolvedValue(mockCount);

      const result = await service.getOrders(params);

      expect(prismaService.order.findMany).toHaveBeenCalledWith(
        expect.anything(),
      );
      expect(prismaService.order.count).toHaveBeenCalledWith(expect.anything());
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('info');
    });
  });

  describe('updateOrderStatus', () => {
    it('should update the order status', async () => {
      const orderId = '1';
      const status = OrderStatus.SHIPPED;
      const mockOrder = { id: orderId, status: OrderStatus.PENDING };

      mockPrismaService.order.findUnique.mockResolvedValue(mockOrder);
      mockPrismaService.order.update.mockResolvedValue({
        ...mockOrder,
        status,
      });

      const result = await service.updateOrderStatus(orderId, status);

      expect(prismaService.order.findUnique).toHaveBeenCalledWith({
        where: { id: orderId },
      });
      expect(prismaService.order.update).toHaveBeenCalledWith({
        where: { id: orderId },
        data: { status },
      });
      expect(result.status).toBe(status);
    });

    it('should throw NotFoundException if order does not exist', async () => {
      const orderId = '2';
      const status = OrderStatus.SHIPPED;

      mockPrismaService.order.findUnique.mockResolvedValue(null);

      await expect(service.updateOrderStatus(orderId, status)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
