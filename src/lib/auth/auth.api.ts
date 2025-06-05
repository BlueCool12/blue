
export interface LoginRequest {
    username: string;
    password: string;
}

export interface AdminInfoResponse {
    username: string;
    roles: string[];
}