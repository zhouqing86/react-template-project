import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import countReducer from 'src/views/countReducer';

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer: {
    count: countReducer,
  },
  middleware,
});

export default store;
