import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import ordersReducer from './slices/ordersSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
});

export default rootReducer;
