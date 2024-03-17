import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlice from './product/productSlice';
import userSlice from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const commonConfig = {
    storage
}

const userConfig = {
    ...commonConfig,
    key: 'shop/user',
    whitelist: ['isLoggedIn', 'token', 'current', 'currentCart', 'isSuccess']
}

const productConfig = {
    ...commonConfig,
    key: 'shop/product',
    whitelist: ['dealDaily']
}

export const store = configureStore({
    reducer: {
        app: appSlice,
        product: persistReducer(productConfig, productSlice),
        user: persistReducer(userConfig, userSlice)
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,],
            },
        }),
});

export const persistor = persistStore(store);
