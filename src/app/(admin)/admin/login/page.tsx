'use client';

import styled from "styled-components";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { RootState } from "@/store/store";
import { clearError, loginAdmin } from "@/lib/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

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
            console.log('✅ 로그인 및 인증 성공 → 페이지 이동 시도');
            router.push('/admin');
        } catch (error) {
            console.error('로그인 실패: ', error);
        }
    };

    return (
        <>
            <LoginWrapper>
                <Form>
                    <Image
                        src='/images/BlueCoolLogin.png'
                        alt="Logo"
                        width={100}
                        height={100}
                        style={{ alignSelf: 'center', marginBottom: '1.5rem' }}
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
                    <button type="button" onClick={handleSubmit} disabled={loading}>로그인</button>
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
    
    height: 100%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;    
    gap: 16px;    
    width: 100%;
    max-width: 300px;
    padding: 8rem 4rem 4rem;
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
        margin-top: 1rem;
        font-weight: bold;
        background-color: var(--btn-bg);
        color: var(--btn-color);
        transition: background-color 0.3s;

        &:hover {
            background-color: var(--btn-hover-color);
        }
    }
`;