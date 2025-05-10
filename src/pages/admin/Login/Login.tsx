import styled from "styled-components";

import BlueCool from '../../../assets/images/BlueCoolLogin.png';
import { useEffect, useState } from "react";
import { clearError, loginAdmin, selectIsAuthenticated } from "../../../store/authSlice";
import { RootState } from "../../../store/store";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const { loading, error } = useAppSelector((state: RootState) => state.auth);

    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) dispatch(clearError());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginAdmin(form));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/admin");
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <LoginWrapper>
                <Form onSubmit={handleSubmit}>
                    <img src={BlueCool} alt="Logo" style={{ width: '100px', margin: '0 auto', paddingBottom: '30px' }} />
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
    background-color: ${({ theme }) => theme.cardBg};
    border-radius: 18px;
    border: 1px solid ${({ theme }) => theme.borderColor};

    input {
        padding: 10px;
        border-radius: 0;
        font-size: 16px;
    }

    button {
        cursor: pointer;
        padding: 10px;
        font-weight: bold;
        background-color: ${({ theme }) => theme.btnBg};
        color: ${({ theme }) => theme.btnColor};
        transition: background-color 0.3s;

        &:hover {
            background-color: ${({ theme }) => theme.btnHoverColor};
        }
    }
`;