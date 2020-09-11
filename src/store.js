import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import countReducer from 'src/views/countReducer';
import userListReducer from 'src/views/UserListView/userListReducer';

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer: {
    count: countReducer,
    userList: userListReducer,
  },
  middleware,
});

export default store;
