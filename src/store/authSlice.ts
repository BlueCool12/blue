import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminLogin } from "../services/authService";

// 비동기 로그인 처리
export const loginAdmin = createAsyncThunk(
    "auth/login",
    async (
        { accountId, password }: { accountId: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const token = await adminLogin(accountId, password);
            return token;
        } catch (error: any) {
            return rejectWithValue(error.message || "로그인 실패");
        }
    });

// ✅ 초기 상태 정의
interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
};

// ✅ Redux Slice 생성
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("token");
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
                state.token = action.payload;
                state.error = null;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export const selectIsAuthenticated = (state: { auth: AuthState }) => !!state.auth.token;
export default authSlice.reducer;
