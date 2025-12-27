# TUKether - 로그인 & 회원가입 화면

Figma 디자인을 기반으로 Vite + React 프로젝트에 구현한 TUKether 로그인 및 회원가입 화면입니다.

## 🚀 시작하기

### 개발 서버 실행

```bash
cd /Users/chahyeonjin/Documents/Programing/FE
npm run dev
```

브라우저에서 표시된 주소(보통 `http://localhost:5173`)로 접속하면 로그인 화면을 확인할 수 있습니다.

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
│   │   ├── LoginScreen.css      # 로그인 화면 스타일
│   │   ├── SignupScreen.jsx     # 회원가입 화면 컴포넌트
│   │   └── SignupScreen.css     # 회원가입 화면 스타일
│   ├── App.jsx                  # 메인 앱 (화면 전환 로직)
│   └── main.jsx                 # 엔트리 포인트
├── index.html                   # HTML 템플릿
├── package.json
└── vite.config.js
```

## ✨ 구현된 기능

### 로그인 화면 (LoginScreen)
- ✅ 이메일 입력 필드
- ✅ 비밀번호 입력 필드
- ✅ Enter 키로 로그인
- ✅ 소셜 로그인 버튼 (Google, Facebook, Naver)
- ✅ 로그인 버튼
- ✅ 회원가입 링크 (클릭 시 회원가입 화면으로 전환)
- ✅ 입력 유효성 검사

### 회원가입 화면 (SignupScreen)
- ✅ 이메일 입력 필드 (필수)
- ✅ 비밀번호 입력 필드 (필수, 8자 이상)
- ✅ 비밀번호 재입력 필드 (필수)
- ✅ 학번 입력 필드 (필수, 숫자만)
- ✅ 학과 선택 드롭다운 (필수, 한국공학대 13개 학과)
- ✅ 닉네임 입력 필드 (선택사항, 최대 30자)
- ✅ 소셜 로그인 버튼 (Google, Facebook, Naver)
- ✅ 회원가입 버튼
- ✅ 돌아가기 버튼 (좌측 하단, 클릭 시 로그인 화면으로)
- ✅ 비밀번호 일치 검사
- ✅ 이메일 형식 검증
- ✅ 학번 숫자 검증
- ✅ 모든 필수 입력 항목 검사

### UI/UX
- ✅ 화면 간 부드러운 전환
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
- **버튼**: 15-16px
- **폰트**: Noto Sans KR

### 컴포넌트
- **로그인 입력 필드**: 높이 45px, 둥근 모서리 28.5px
- **회원가입 입력 필드**: 높이 41px, 둥근 모서리 28.5px
- **로그인 버튼**: 124px × 45px
- **회원가입 버튼**: 134px × 41px
- **소셜 아이콘**: 37px × 37px (로그인), 34px × 34px (회원가입)

## 🔧 화면 전환 로직

현재 `App.jsx`에서 `useState`를 사용한 간단한 화면 전환을 구현했습니다:

```javascript
const [currentScreen, setCurrentScreen] = useState('login') // 'login' 또는 'signup'
```

### React Router로 업그레이드하기 (선택사항)

더 정교한 라우팅이 필요하다면 React Router를 설치하세요:

```bash
npm install react-router-dom
```

```javascript
// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

그리고 컴포넌트를 다음과 같이 수정:

```javascript
// LoginScreen.jsx
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const navigate = useNavigate();
  
  const handleSignup = () => {
    navigate('/signup');
  };
  // ...
};

// SignupScreen.jsx
import { useNavigate } from 'react-router-dom';

const SignupScreen = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/login');
  };
  // ...
};
```

## 🗄️ DB 테이블 구조

프로젝트는 다음 DB 테이블 구조를 기반으로 구현되었습니다:

```sql
CREATE TABLE users (
  user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  role_id BIGINT NOT NULL DEFAULT 1,
  email VARCHAR(100) NOT NULL UNIQUE,
  student_num INT NOT NULL UNIQUE,
  department VARCHAR(50) NOT NULL,
  nickname VARCHAR(30) NULL,
  password VARCHAR(255) NOT NULL,
  create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  update_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 필수 필드
- **email**: 이메일 주소 (중복 불가)
- **password**: 비밀번호 (해싱 필수)
- **student_num**: 학번 (숫자, 중복 불가)
- **department**: 학과 (드롭다운 선택)

### 선택 필드
- **nickname**: 닉네임 (최대 30자)

### 학과 목록
```javascript
const departments = [
  '기계공학과', '메카트로닉스공학과', '전기공학과', '전자공학과',
  '컴퓨터공학과', '소프트웨어공학과', '디자인공학과', '건축공학과',
  '화학생명공학과', '에너지신소재화학공학과', '산업경영학과',
  '경영학과', '교양학부'
];
```

**📘 상세한 DB 연동 가이드는 `DB_INTEGRATION_GUIDE.md` 파일을 참고하세요!**

## 🔌 백엔드 연동 방법

### 1. 로그인 API 연동

`src/components/LoginScreen.jsx`의 `handleLogin` 함수를 수정하세요:

```javascript
const handleLogin = async () => {
  if (!email || !password) {
    alert('이메일과 비밀번호를 입력해주세요.');
    return;
  }
  
  try {
    const response = await fetch('YOUR_API_ENDPOINT/api/auth/login', {
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
      localStorage.setItem('user', JSON.stringify(data.user));
      // 메인 페이지로 이동
      window.location.href = '/dashboard';
    } else {
      alert(data.message || '로그인에 실패했습니다.');
    }
  } catch (error) {
    console.error('로그인 에러:', error);
    alert('서버 연결에 실패했습니다.');
  }
};
```

### 2. 회원가입 API 연동

`src/components/SignupScreen.jsx`의 `handleSignup` 함수를 수정하세요:

```javascript
const handleSignup = async () => {
  // 유효성 검사 (이미 구현됨)
  if (!email || !password || !passwordConfirm || !studentNum || !department) {
    alert('필수 항목을 모두 입력해주세요.');
    return;
  }
  
  if (password !== passwordConfirm) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
  
  try {
    const response = await fetch('YOUR_API_ENDPOINT/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password, // 백엔드에서 해싱 필수!
        student_num: parseInt(studentNum),
        department: department,
        nickname: nickname || null,
        role_id: 1
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert('회원가입이 완료되었습니다!');
      if (onBack) onBack();
    } else {
      // 중복 에러 처리
      if (data.error === 'email') {
        alert('이미 사용 중인 이메일입니다.');
      } else if (data.error === 'student_num') {
        alert('이미 등록된 학번입니다.');
      } else {
        alert(data.message || '회원가입에 실패했습니다.');
      }
    }
  } catch (error) {
    console.error('회원가입 에러:', error);
    alert('서버 연결에 실패했습니다.');
  }
};
```

**⚠️ 중요:** 비밀번호는 반드시 백엔드에서 bcrypt 등으로 해싱해야 합니다!

### 3. 소셜 로그인 연동

각 소셜 로그인 플랫폼의 OAuth 설정이 필요합니다:

```javascript
const handleSocialLogin = (platform) => {
  const socialAuthUrls = {
    Google: 'YOUR_BACKEND_URL/api/auth/google',
    Facebook: 'YOUR_BACKEND_URL/api/auth/facebook',
    Naver: 'YOUR_BACKEND_URL/api/auth/naver',
  };
  
  // OAuth 페이지로 리다이렉트
  window.location.href = socialAuthUrls[platform];
};
```

## 📱 반응형 브레이크포인트

### 태블릿 (768px 이하)
- 로고 크기 조정
- 여백 조정

### 모바일 (576px 이하)
- 로고 크기 감소 (36px)
- 소셜 로그인과 버튼이 세로 배치
- 버튼 전체 너비
- 돌아가기 버튼 위치 조정

### 초소형 화면 (400px 이하)
- 로고 크기 더 감소 (32px)
- 소셜 아이콘 간격 감소
- 아이콘 크기 축소

## 🔜 향후 추가 기능

### 입력 검증
- [ ] 이메일 형식 유효성 검사 (정규식)
- [ ] 비밀번호 강도 표시
- [ ] 사용자 ID 중복 확인 API
- [ ] 실시간 입력 검증

### UI 개선
- [ ] 비밀번호 표시/숨김 토글
- [ ] 로딩 스피너
- [ ] 에러 메시지 UI (alert 대신)
- [ ] 성공 메시지 토스트
- [ ] 폼 제출 후 입력 필드 초기화

### 기능 추가
- [ ] 비밀번호 찾기
- [ ] 자동 로그인 (Remember Me)
- [ ] 이메일 인증
- [ ] 캡차(CAPTCHA) 추가
- [ ] 다국어 지원 (i18n)

## 🐛 트러블슈팅

### 하얀 화면만 보이는 경우
1. 브라우저 개발자 도구(F12) 콘솔에서 에러 확인
2. 터미널에서 개발 서버가 정상 실행 중인지 확인
3. 포트 번호 확인 (Vite 기본 포트는 5173)
4. 캐시 삭제 후 재시작:
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

### 스타일이 적용되지 않는 경우
1. CSS 파일 import 경로 확인
2. 브라우저 캐시 강제 새로고침 (Cmd+Shift+R / Ctrl+Shift+R)

### 화면 전환이 안 되는 경우
1. App.jsx의 state가 제대로 업데이트되는지 확인
2. 콘솔에서 에러 메시지 확인
3. prop 전달이 올바른지 확인

## 🌐 브라우저 호환성

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)
- 모바일 브라우저 (iOS Safari, Chrome Mobile)

## 📄 라이선스

MIT License

## 👨‍💻 개발 정보

- Framework: React 19.1.1
- Build Tool: Vite 6.0.1
- Language: JavaScript (ES6+)
- Styling: CSS3

---

Made with ❤️ for TUKether
