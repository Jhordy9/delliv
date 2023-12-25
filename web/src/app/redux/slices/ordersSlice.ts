import { axiosRq } from '@/app/services/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}

export type Order = {
  id: string;
  address: string;
  status: OrderStatus;
  name: string;
};

export type OrdersInfo = {
  page: number;
  take: number;
  total_pages: number;
  total_items: number;
};
export type FetchOrdersParams = {
  take?: number;
  page?: number;
  search?: string;
  status?: OrderStatus;
};

export type OrdersState = {
  orders: Order[];
  info: OrdersInfo | null;
  loading: boolean;
  error: string | null;
};

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async (
    { orderId, newStatus }: { orderId: string; newStatus: OrderStatus },
    { rejectWithValue }
  ) => {
    try {
      await axiosRq.put(
        `/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('dellivToken')}`,
          },
        }
      );
      return { orderId, newStatus };
    } catch (error) {
      return rejectWithValue('Failed to update order status');
    }
  }
);

export const fetchOrders = createAsyncThunk(
  'orders',
  async (params: FetchOrdersParams, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(
        params as Record<string, string>
      ).toString();

      const { data } = await axiosRq.get<{
        data: Order[];
        info: OrdersInfo;
      }>(`/orders?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('dellivToken')}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch orders');
    }
  }
);

const initialState: OrdersState = {
  orders: [],
  info: null,
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<{ data: Order[]; info: OrdersInfo }>) => {
          state.orders = action.payload.data;
          state.info = action.payload.info;
          state.loading = false;
        }
      )
      .addCase(
        updateOrderStatus.fulfilled,
        (
          state,
          action: PayloadAction<{ orderId: string; newStatus: OrderStatus }>
        ) => {
          const { orderId, newStatus } = action.payload;
          const order = state.orders.find((order) => order.id === orderId);
          if (order) {
            order.status = newStatus;
          }
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

const ordersReducer = ordersSlice.reducer;

export default ordersReducer;
