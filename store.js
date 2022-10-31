import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './slices/commentSlice';
import commonReducer from './slices/commonSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    common: commonReducer,
  },
})
