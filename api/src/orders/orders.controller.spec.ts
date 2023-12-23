/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderStatus } from '@prisma/client';
import * as request from 'supertest';

describe('OrdersController', () => {
  let app: INestApplication;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const mockOrdersService = {
      getOrders: jest.fn().mockImplementation((params) => {
        return {
          data: [],
          info: {
            page: 1,
            take: 10,
            total_pages: 1,
            total_items: 0,
          },
        };
      }),
      updateOrderStatus: jest.fn().mockImplementation((id, status) => ({
        id,
        status,
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrdersService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(OrdersController).toBeDefined();
  });

  it('should return orders with pagination info', async () => {
    const response = await request(app.getHttpServer())
      .get('/orders')
      .query({ status: OrderStatus.PENDING, page: '1', take: '10' })
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      data: [],
      info: {
        page: 1,
        take: 10,
        total_pages: 1,
        total_items: 0,
      },
    });
    expect(ordersService.getOrders).toHaveBeenCalledWith({
      status: OrderStatus.PENDING,
      page: '1',
      take: '10',
    });
  });

  it('should update an order status', async () => {
    const orderId = '1';
    const orderStatus = OrderStatus.SHIPPED;

    const response = await request(app.getHttpServer())
      .put(`/orders/${orderId}`)
      .send({ status: orderStatus })
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      id: orderId,
      status: orderStatus,
    });
    expect(ordersService.updateOrderStatus).toHaveBeenCalledWith(
      orderId,
      orderStatus,
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
