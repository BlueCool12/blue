import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminLogin, checkAuth } from "../services/authService";

// 비동기 로그인 처리
export const loginAdmin = createAsyncThunk(
    "auth/login",
    async (
        { username, password }: { username: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const token = await adminLogin({ username, password });
            return token;
        } catch (error: any) {
            return rejectWithValue(error.message || "로그인 실패");
        }
    });

export const verifyAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            await checkAuth();
            return true;
        } catch (error: any) {
            return rejectWithValue("인증 실패")
        }
    }
);

// ✅ 초기 상태 정의
interface AuthState {
    isAuthenticated: boolean;
    authChecked: boolean;
    token: string | null,
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    authChecked: false,
    token: null,
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
            state.authChecked = false;
            state.token = null;
            state.error = null;
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
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.authChecked = true;
                state.token = action.payload as string;
                state.error = null;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(verifyAuth.fulfilled, (state) => {
                state.isAuthenticated = true;
                state.authChecked = true;
            })
            .addCase(verifyAuth.rejected, (state) => {
                state.isAuthenticated = false;
                state.authChecked = true;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export default authSlice.reducer;
