import { useEffect, useState } from "react";
import "./LoginModal.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearError, loginAdmin } from "../store/authSlice";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {

    const dispatch = useAppDispatch();

    const { token, loading, error } = useAppSelector((state) => state.auth);

    const [loginState, setLoginState] = useState({
        accountId: "",
        password: ""
    });

    useEffect(() => {
        if (!isOpen) {
            setLoginState({ accountId: "", password: "" });
            dispatch(clearError());
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && token) {
            onClose();
        }
    }, [token, isOpen, onClose]);

    if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    // form 태그의 submit 이벤트 핸들러
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); // 기본 동작 방지

        if (!loginState.accountId || !loginState.password) { // 유효성 검사
            alert("아이디와 비밀번호를 입력하세요");
            return;
        }

        // 로그인 액션 디스패치
        dispatch(loginAdmin(loginState));
    };

    return (
        <div className="login-modal__overlay" onClick={onClose}>
            <div className="login-modal__content" onClick={(e) => e.stopPropagation()}>

                {/* 헤더 영역 (관리자 로그인 + 닫기 버튼) */}
                <div className="login-modal__header">
                    <h2>관리자 로그인</h2>
                    <button className="material-symbols-rounded login-modal__header-close-button" onClick={onClose}>close</button>
                </div>

                <form onSubmit={handleLogin} autoComplete="off">
                    <div className="login-modal__field-group">
                        <label className="login-modal__field-group-label" htmlFor="accountId">아이디</label>
                        <input
                            className="login-modal__field-group-input"
                            type="text"
                            name="accountId"
                            id="accountId"
                            value={loginState.accountId}
                            onChange={handleChange}
                            placeholder="관리자 아이디를 입력하세요"
                            autoFocus
                            required
                        />
                    </div>
                    <div className="login-modal__field-group">
                        <label className="login-modal__field-group-label" htmlFor="password">비밀번호</label>
                        <input
                            className="login-modal__field-group-input"
                            type="password"
                            name="password"
                            id="password"
                            value={loginState.password}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>

                    {error && <div className="login-modal__error-message">{error}</div>}

                    <button type="submit" className="login-modal__submit-button" disabled={loading}>로그인</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
