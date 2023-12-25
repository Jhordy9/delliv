import authReducer, { AuthState, login } from '@/app/redux/slices/authSlice';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('../../services/axios.ts', () => ({
  axiosRq: {
    post: jest.fn(),
  },
}));

describe('authSlice', () => {
  const initialState: AuthState = {
    jwtToken: null,
    isAuthenticated: false,
    error: null,
  };

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle login', async () => {
    const store = configureStore({ reducer: { auth: authReducer } });

    const mockedAxiosRq = require('../../services/axios.ts').axiosRq;
    mockedAxiosRq.post.mockResolvedValueOnce({
      data: { access_token: 'token123' },
    });

    await store.dispatch(
      login({ email: 'test@example.com', password: 'password' })
    );

    const state = store.getState().auth;
    expect(state.jwtToken).toEqual('token123');
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle failed login', async () => {
    const store = configureStore({ reducer: { auth: authReducer } });

    const mockedAxiosRq = require('../../services/axios.ts').axiosRq;
    mockedAxiosRq.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    await store.dispatch(
      login({ email: 'wrong@example.com', password: 'wrongpass' })
    );

    const state = store.getState().auth;
    expect(state.jwtToken).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).not.toBeNull();
  });
});
