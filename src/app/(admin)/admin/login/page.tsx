'use client';

import styled from "styled-components";

import { useState } from "react";
import { clearError, loginAdmin } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state: RootState) => state.auth);

    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) dispatch(clearError());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(loginAdmin(form)).unwrap();
            router.push('/admin');
        } catch {

        }
    };

    return (
        <>
            <LoginWrapper>
                <Form onSubmit={handleSubmit}>
                    <Image
                        src='/images/BlueCoolLogin.png'
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                    <input
                        type="text"
                        placeholder="아이디"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" disabled={loading}>로그인</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Form>
            </LoginWrapper>
        </>
    );
};

export default Login;

const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;    
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;    
    width: 100%;
    max-width: 450px;
    padding: 30px 70px 70px;
    text-align: center;
    background-color: var(--card-bg);
    border-radius: 18px;
    border: 1px solid var(--border-color);

    input {
        padding: 10px;
        border-radius: 0;
        font-size: 16px;
    }

    button {
        cursor: pointer;
        padding: 10px;
        font-weight: bold;
        background-color: var(--btn-bg);
        color: var(--btn-color);
        transition: background-color 0.3s;

        &:hover {
            background-color: var(--btn-hover-color);
        }
    }
`;