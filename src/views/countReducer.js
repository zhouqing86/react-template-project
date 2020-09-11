import { createSlice } from '@reduxjs/toolkit';

const countSlice = createSlice({
  name: 'count',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
  },
});

export const selectCount = (state) => state.count.count;

export const { increment, decrement } = countSlice.actions;

export default countSlice.reducer;
