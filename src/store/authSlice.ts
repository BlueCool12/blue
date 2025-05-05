import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminLogin } from "../services/authService";

// 비동기 로그인 처리
export const loginAdmin = createAsyncThunk(
    "auth/login",
    async (
        { username, password }: { username: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            await adminLogin({ username, password });
            return true;
        } catch (error: any) {
            return rejectWithValue(error.message || "로그인 실패");
        }
    });

// ✅ 초기 상태 정의
interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    error: null,
};

// ✅ Redux Slice 생성
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export default authSlice.reducer;
