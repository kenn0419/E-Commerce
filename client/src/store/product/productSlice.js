import { createSlice } from '@reduxjs/toolkit';
import * as action from './asyncAction';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: null,
        errorMessage: '',
        dealDaily: null
    },
    //Code logic xử lý action thông thường
    reducers: {
        getDealDaily: (state, action) => {
            state.dealDaily = action.payload;
        }
    },
    // Code logic xử lý async action
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action login (Promise pending)
        builder.addCase(action.getNewProducts.pending, (state) => {
            state.isLoading = true;
        });

        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(action.getNewProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newProducts = action.payload;
        });

        // Khi thực hiện action login thất bại (Promise rejected)
        builder.addCase(action.getNewProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
})

export const { getDealDaily } = productSlice.actions

export default productSlice.reducer
