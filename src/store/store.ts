import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../lib/auth/authSlice";
import adminPostReducer from "./admin/postSlice";
import adminCategoryReducer from "./admin/categorySlice";
import userPostReducer from "./user/postSlice";
import userCategoryReducer from "./user/categorySlice";
import userCommentReducer from "./user/commentSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        adminPost: adminPostReducer,
        adminCategory: adminCategoryReducer,
        userPost: userPostReducer,
        userCategory: userCategoryReducer,
        userComment: userCommentReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;