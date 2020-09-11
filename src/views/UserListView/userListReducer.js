import { createSlice } from '@reduxjs/toolkit';
import get from 'lodash/get';
import { fetchUsers as fetchUsersApi, deleteUser as deleteUserApi } from 'src/api/usersApi';
import config from 'src/config';

const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    users: [],
    page: {
      totalCount: 0,
      page: 0,
      pageSize: config.FORM_LIST_PAGE_SIZE,
    },
    loading: 'idle',
    error: null,
  },
  reducers: {
    startAsyncRequest: (state) => {
      state.loading = 'pending';
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = 'idle';
      state.users = action.payload.rows;
      state.page.totalCount = action.payload.totalCount;
    },
    fetchUsersFailed: (state, action) => {
      state.loading = 'idle';
      state.error = action.payload.message;
    },
    removeUserSuccess: (state) => {
      state.loading = 'idle';
    },
    removeUserFailed: (state, action) => {
      state.loading = 'idle';
      state.error = action.payload.message;
    },
    updatePageData: (state, action) => {
      state.page = {
        ...state.page,
        ...action.payload,
      };
    },
  },
});

export const selectUsers = (state) => state.userList.users;
export const selectPageData = (state) => state.userList.page;
export const selectIsPageLoading = (state) => state.userList.loading === 'pending';

export const { startAsyncRequest, fetchUsersSuccess, fetchUsersFailed, removeUserSuccess, removeUserFailed, updatePageData } = userListSlice.actions;

export const fetchUsers = () => async (dispatch, getState) => {
  dispatch(startAsyncRequest());
  const state = getState();
  try {
    const page = get(state, 'userList.page');
    const response = await fetchUsersApi({
      page: page.page + 1,
      pageSize: page.pageSize,
    });
    const rows = response.data;
    const totalCount = Number(get(response.headers, 'x-total-count', 0));
    dispatch(fetchUsersSuccess({ totalCount, rows }));
  } catch (err) {
    console.log('Error happen when try to fetch users', err);
    dispatch(fetchUsersFailed({ message: 'Error happen when try to fetch users!' }));
  }
};

export const removeUser = (userId) => async (dispatch) => {
  dispatch(startAsyncRequest());
  try {
    await deleteUserApi(userId);
    dispatch(removeUserSuccess());
  } catch (err) {
    console.log(`Failed to remove user with id=${userId}, error is`, err);
    dispatch(removeUserFailed({ message: `Failed to remove user with id=${userId}` }));
  }
};

export default userListSlice.reducer;
