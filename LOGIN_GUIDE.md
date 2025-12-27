# TUKether 로그인 화면 구현

Figma 디자인을 기반으로 Vite + React 프로젝트에 구현한 TUKether 로그인 화면입니다.

## 🚀 시작하기

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` (또는 콘솔에 표시된 주소)로 접속하면 로그인 화면을 확인할 수 있습니다.

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 📁 프로젝트 구조

```
FE/
├── src/
│   ├── components/
│   │   ├── LoginScreen.jsx      # 로그인 화면 컴포넌트
│   │   └── LoginScreen.css      # 로그인 화면 스타일
│   ├── App.jsx                  # 메인 앱 컴포넌트
│   └── main.jsx                 # 엔트리 포인트
├── index.html                    # HTML 템플릿
├── package.json
└── vite.config.js
```

## ✨ 구현된 기능

### 로그인 폼
- ✅ 이메일 입력 필드
- ✅ 비밀번호 입력 필드
- ✅ Enter 키로 로그인 가능
- ✅ 입력 유효성 검사 (빈 값 체크)

### 소셜 로그인
- ✅ Google 로그인 버튼
- ✅ Facebook 로그인 버튼
- ✅ Naver 로그인 버튼
- ✅ SVG 아이콘 포함

### UI/UX
- ✅ 반응형 디자인 (모바일 대응)
- ✅ 호버 효과 및 애니메이션
- ✅ 접근성 고려 (aria-label)
- ✅ Noto Sans KR 폰트 적용

## 🎨 디자인 스펙

### 컬러
- **메인 컬러**: `#0d57a7` (파란색)
- **배경색**: `#ffffff` (흰색)
- **입력 필드 배경**: `#dddddd` (회색)
- **플레이스홀더**: `#777777` (회색)

### 타이포그래피
- **로고**: 48px (모바일: 36px)
- **라벨**: 16px
- **버튼**: 15px
- **회원가입 텍스트**: 14px
- **폰트**: Noto Sans KR

### 컴포넌트
- **입력 필드**: 높이 45px, 둥근 모서리 28.5px
- **로그인 버튼**: 124px × 45px
- **소셜 아이콘**: 37px × 37px

## 🔧 백엔드 연동 방법

### 1. 로그인 API 연동

`src/components/LoginScreen.jsx`의 `handleLogin` 함수를 수정하세요:

```javascript
const handleLogin = async () => {
  if (!email) {
    alert('이메일을 입력해주세요.');
    return;
  }
  
  if (!password) {
    alert('비밀번호를 입력해주세요.');
    return;
  }
  
  try {
    const response = await fetch('YOUR_API_ENDPOINT/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // 로그인 성공
      localStorage.setItem('token', data.token);
      // 메인 페이지로 이동
      window.location.href = '/';
    } else {
      // 로그인 실패
      alert(data.message || '로그인에 실패했습니다.');
    }
  } catch (error) {
    console.error('로그인 에러:', error);
    alert('서버 연결에 실패했습니다.');
  }
};
```

### 2. 소셜 로그인 연동

`handleSocialLogin` 함수를 각 플랫폼의 OAuth URL로 리다이렉트하도록 수정하세요:

```javascript
const handleSocialLogin = (platform) => {
  const socialAuthUrls = {
    Google: 'YOUR_BACKEND_URL/auth/google',
    Facebook: 'YOUR_BACKEND_URL/auth/facebook',
    Naver: 'YOUR_BACKEND_URL/auth/naver',
  };
  
  window.location.href = socialAuthUrls[platform];
};
```

### 3. 회원가입 페이지 연결

React Router를 설치하고 라우팅을 설정하세요:

```bash
npm install react-router-dom
```

```javascript
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen'; // 회원가입 페이지

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
```

```javascript
// LoginScreen.jsx의 handleSignup 함수
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const navigate = useNavigate();
  
  const handleSignup = () => {
    navigate('/signup');
  };
  
  // ...
};
```

## 📱 반응형 브레이크포인트

- **576px 이하**: 모바일 레이아웃
  - 로고 크기 감소 (36px)
  - 소셜 로그인과 버튼이 세로 배치
  - 로그인 버튼 전체 너비

- **400px 이하**: 초소형 화면
  - 로고 크기 더 감소 (32px)
  - 소셜 아이콘 간격 감소

## 🔜 향후 추가 기능

- [ ] 이메일 형식 유효성 검사
- [ ] 비밀번호 강도 표시
- [ ] 비밀번호 표시/숨김 토글
- [ ] 비밀번호 찾기 기능
- [ ] 자동 로그인 체크박스
- [ ] 로딩 상태 표시
- [ ] 에러 메시지 UI
- [ ] 다국어 지원 (i18n)

## 🌐 브라우저 호환성

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)
- 모바일 브라우저

## 📄 라이선스

MIT License