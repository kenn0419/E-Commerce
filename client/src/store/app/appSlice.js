import { createSlice } from '@reduxjs/toolkit';
import * as action from './asyncAction';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    categories: null,
    isLoading: false,
    currentUser: null,
  },
  //Code logic xử lý action thông thường
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.errorMessage = '';
    },
  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(action.getCategory.pending, (state) => {
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(action.getCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(action.getCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
})

// export const { } = appSlice.actions

export default appSlice.reducer
