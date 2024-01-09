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
            state.current = action.payload;
        });

        // Khi thực hiện action login thất bại (Promise rejected)
        builder.addCase(action.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
            state.errorMessage = action.payload.message;
        });
    },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
