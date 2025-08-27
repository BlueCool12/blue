import { configureStore } from "@reduxjs/toolkit";
import userPostReducer from "./postSlice";

export const store = configureStore({
    reducer: {
        userPost: userPostReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;