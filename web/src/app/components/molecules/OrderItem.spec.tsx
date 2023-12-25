import ordersReducer, {
  OrderStatus,
  OrdersState,
  updateOrderStatus,
} from '@/app/redux/slices/ordersSlice';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('../../services/axios.ts', () => ({
  axiosRq: {
    put: jest.fn(),
  },
}));

describe('ordersSlice', () => {
  const initialState: OrdersState = {
    orders: [
      {
        id: '1',
        name: 'Order 1',
        status: OrderStatus.PENDING,
        address: '123 Street',
      },
      {
        id: '2',
        name: 'Order 2',
        status: OrderStatus.SHIPPED,
        address: '456 Avenue',
      },
    ],
    error: null,
    info: null,
    loading: false,
  };

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should handle initial state', () => {
    expect(ordersReducer(undefined, { type: 'unknown' })).toEqual({
      error: null,
      info: null,
      loading: false,
      orders: [],
    });
  });

  it('should handle updating an order status', async () => {
    const store = configureStore({
      reducer: { orders: ordersReducer },
      preloadedState: {
        orders: initialState,
      },
    });

    const mockedAxiosRq = require('../../services/axios.ts').axiosRq;
    mockedAxiosRq.put.mockResolvedValueOnce({});

    await store.dispatch(
      updateOrderStatus({ orderId: '1', newStatus: OrderStatus.DELIVERED })
    );

    const state = store.getState().orders;
    const updatedOrder = state.orders.find((order) => order.id === '1');

    expect(updatedOrder?.status).toEqual('DELIVERED');
  });
});
