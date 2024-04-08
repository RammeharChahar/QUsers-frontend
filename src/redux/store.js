import {configureStore} from '@reduxjs/toolkit';
import userReducers from './slices/userSlice'

export const store = configureStore({
    reducer: userReducers,
});