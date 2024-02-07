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
    },
    //Code logic xử lý action thông thường
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.token = null
        },
        clearMessage: (state, action) => {
            state.message = '';
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

export const { login, logout, clearMessage } = userSlice.actions

export default userSlice.reducer
