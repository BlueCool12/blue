import { useState } from "react";
import "./LoginModal.scss";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {

    const [loginState, setLoginState] = useState({
        accountId: "",
        password: ""
    });

    if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!loginState.accountId || !loginState.password) {
            alert("아이디와 비밀번호를 입력하세요.");
            return;
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                {/* 헤더 영역 (관리자 로그인 + 닫기 버튼) */}
                <div className="modal-header">
                    <h2>관리자 로그인</h2>
                    <button className="material-symbols-rounded close-button" onClick={onClose}>close</button>
                </div>

                <form onSubmit={handleLogin} autoComplete="off">
                    <div className="input-group">
                        <label htmlFor="email">아이디</label>
                        <input
                            type="text"
                            name="accountId"
                            id="accountId"
                            value={loginState.accountId}
                            onChange={handleChange}
                            placeholder="관리자 아이디를 입력하세요"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={loginState.password}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>

                    <button type="submit" className="login-button">로그인</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
