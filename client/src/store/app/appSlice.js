import { createSlice } from '@reduxjs/toolkit';
import * as action from './asyncAction';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    categories: null,
    isLoading: false,
    isShowModal: false,
    modalChildren: null,
    isShowCart: false,
  },
  //Code logic xử lý action thông thường
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
    showCart: (state) => {
      state.isShowCart = state.isShowCart ? false : true;
    }
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

export const { showModal, showCart } = appSlice.actions

export default appSlice.reducer
