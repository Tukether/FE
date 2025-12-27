import { useState } from 'react';
import './SignupScreen.css';

const SignupScreen = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [studentNum, setStudentNum] = useState('');
  const [department, setDepartment] = useState('');
  const [nickname, setNickname] = useState('');

  // 한국공학대학교 학과 리스트
  const departments = [
      'SW 자율전공',
      '컴퓨터공학부',
      '게임공학과',
      '인공지능학과',
      '스마트기계융합 자율전공',
      '기계공학과',
      '기계설계공학과',
      '메카트로닉스공학부',
      'IT반도체융합 자율전공',
      '전자공학부',
      '반도체공학부',
      '첨단융합 자율전공',
      '신소재공학과',
      '생명화학공학부',
      '에너지전기공학부',
      '경영학부',
      '디자인공학부',
      '지식융합학부',
      '기업인재대학'
  ];

  const handleSignup = () => {
    // 필수 필드 유효성 검사
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    
    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    
    if (password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    
    if (!passwordConfirm) {
      alert('비밀번호를 다시 입력해주세요.');
      return;
    }
    
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (!studentNum) {
      alert('학번을 입력해주세요.');
      return;
    }
    
    // 학번 숫자 형식 검사
    if (!/^\d+$/.test(studentNum)) {
      alert('학번은 숫자만 입력해주세요.');
      return;
    }
    
    if (!department) {
      alert('학과를 선택해주세요.');
      return;
    }

    if (!nickname) {
        alert("닉네임을 입력해주세요.");
        return;
    }
    
    console.log('회원가입:', { 
      email, 
      password, 
      student_num: studentNum,
      department,
      nickname
    });
    
    // TODO: 여기에 실제 회원가입 API 호출 로직 추가
    alert('회원가입이 완료되었습니다!');
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      console.log('돌아가기 클릭');
      // TODO: 로그인 페이지로 이동
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* 로고 */}
        <h1 className="logo">
          <span className="logo-bold">TUK</span>ether
        </h1>

        {/* 이메일 입력 */}
        <div className="form-group">
          <label htmlFor="email">이메일 *</label>
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
          <label htmlFor="password">비밀번호 *</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요. (8자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 비밀번호 재입력 */}
        <div className="form-group">
          <label htmlFor="passwordConfirm">비밀번호 재입력 *</label>
          <input
            type="password"
            id="passwordConfirm"
            placeholder="비밀번호를 다시 입력해주세요."
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        {/* 학번 입력 */}
        <div className="form-group">
          <label htmlFor="studentNum">학번 *</label>
          <input
            type="text"
            id="studentNum"
            placeholder="학번을 입력해주세요."
            value={studentNum}
            onChange={(e) => setStudentNum(e.target.value)}
            maxLength="10"
          />
        </div>

        {/* 학과 선택 */}
        <div className="form-group">
          <label htmlFor="department">학과 *</label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="department-select"
          >
            <option value="">학과를 선택해주세요.</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* 닉네임 입력 (선택사항) */}
        <div className="form-group">
          <label htmlFor="nickname">닉네임 *</label>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength="30"
          />
        </div>

        {/* 회원가입 버튼 */}
        <button className="signup-button" onClick={handleSignup}>
          회원가입
        </button>

        {/* 필수 입력 안내 */}
        <p className="required-notice">* 필수 입력 항목</p>
      </div>

      {/* 돌아가기 버튼 */}
      <button className="back-button" onClick={handleBack}>
        <svg width="11" height="18" viewBox="0 0 11 18" fill="none">
          <path d="M10 1L2 9L10 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>돌아가기</span>
      </button>
    </div>
  );
};

export default SignupScreen;
