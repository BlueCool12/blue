import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminPostReducer from "./admin/postSlice";
import userPostReducer from "./user/postSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        adminPost: adminPostReducer,
        userPost: userPostReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;