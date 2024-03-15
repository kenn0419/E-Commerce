import { createSlice } from '@reduxjs/toolkit';
import * as action from './asyncAction';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        errorMessage: '',
        isLoading: false,
        message: '',
        currentCart: [],
    },
    //Code logic xử lý action thông thường
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
            state.current = action.payload.current;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.current = null;
            state.token = null;
            state.errorMessage = '';
            state.isLoading = false;
            state.message = '';
        },
        clearMessage: (state, action) => {
            state.message = '';
        },
        updateCart: (state, action) => {
            const { pid, color, quantity } = action.payload;
            const updatingCart = JSON.parse(JSON.stringify(state.currentCart));
            state.currentCart = updatingCart.map(item => {
                if (item.color === color && item.product._id === pid) {
                    return { ...item, quantity };
                } else {
                    return item;
                }
            });
        }
    },
    //Code logic xử lý async action
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action login (Promise pending)
        builder.addCase(action.getCurrent.pending, (state) => {
            state.isLoading = true;
        });

        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(action.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.current = action.payload;
            state.currentCart = action.payload.cart;
        });

        // Khi thực hiện action login thất bại (Promise rejected)
        builder.addCase(action.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
            state.isLoggedIn = false;
            state.token = null;
            state.errorMessage = action.payload.message;
            state.message = 'Login session has expired. Please login again'
        });
    },
})

export const { login, logout, clearMessage, updateCart } = userSlice.actions

export default userSlice.reducer
