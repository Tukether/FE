import { useState } from 'react';
import './LoginScreen.css';

const LoginScreen = ({ onSignupClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    
    console.log('로그인:', { email, password });
    // TODO: 여기에 실제 로그인 API 호출 로직 추가
  };

  const handleSignup = () => {
    if (onSignupClick) {
      onSignupClick();
    } else {
      console.log('회원가입 클릭');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* 로고 */}
        <h1 className="logo">
          <span className="logo-bold">TUK</span>ether
        </h1>

        {/* 이메일 입력 */}
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* 로그인 버튼 */}
        <button className="login-button" onClick={handleLogin}>
          로그인
        </button>

        {/* 회원가입 링크 */}
        <p className="signup-text">
          아직 회원이 아니신가요?{' '}
          <span className="signup-link" onClick={handleSignup}>
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
