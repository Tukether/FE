# 회원가입 페이지 DB 연동 가이드

## 📋 DB 테이블 구조

```sql
CREATE TABLE users (
  user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  role_id BIGINT NOT NULL DEFAULT 1,
  email VARCHAR(100) NOT NULL UNIQUE,
  student_num INT NOT NULL UNIQUE,
  department VARCHAR(50) NOT NULL,
  nickname VARCHAR(30) NULL,
  password VARCHAR(255) NOT NULL,
  create_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔌 회원가입 API 연동 예시

### 1. API 요청 형식

```javascript
// SignupScreen.jsx의 handleSignup 함수 수정
const handleSignup = async () => {
  // 유효성 검사 (기존 코드 유지)
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
        password: password, // 주의: 백엔드에서 반드시 해싱해야 함!
        student_num: parseInt(studentNum),
        department: department,
        nickname: nickname || null, // 선택사항
        role_id: 1 // 기본값: 일반 사용자
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert('회원가입이 완료되었습니다!');
      // 로그인 화면으로 이동
      if (onBack) onBack();
    } else {
      // 에러 처리
      if (data.message) {
        alert(data.message);
      } else if (data.error) {
        // 중복 에러 처리
        if (data.error.includes('email')) {
          alert('이미 사용 중인 이메일입니다.');
        } else if (data.error.includes('student_num')) {
          alert('이미 등록된 학번입니다.');
        } else {
          alert('회원가입에 실패했습니다.');
        }
      }
    }
  } catch (error) {
    console.error('회원가입 에러:', error);
    alert('서버 연결에 실패했습니다.');
  }
};
```

### 2. 백엔드 예시 (Node.js + Express)

```javascript
// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db'); // MySQL 연결

router.post('/signup', async (req, res) => {
  try {
    const { email, password, student_num, department, nickname } = req.body;
    
    // 유효성 검사
    if (!email || !password || !student_num || !department) {
      return res.status(400).json({ 
        message: '필수 항목을 모두 입력해주세요.' 
      });
    }
    
    // 이메일 중복 확인
    const [existingEmail] = await db.query(
      'SELECT user_id FROM users WHERE email = ?',
      [email]
    );
    
    if (existingEmail.length > 0) {
      return res.status(409).json({ 
        error: 'email',
        message: '이미 사용 중인 이메일입니다.' 
      });
    }
    
    // 학번 중복 확인
    const [existingStudent] = await db.query(
      'SELECT user_id FROM users WHERE student_num = ?',
      [student_num]
    );
    
    if (existingStudent.length > 0) {
      return res.status(409).json({ 
        error: 'student_num',
        message: '이미 등록된 학번입니다.' 
      });
    }
    
    // 비밀번호 해싱 (중요!)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 사용자 생성
    const [result] = await db.query(
      `INSERT INTO users 
       (email, password, student_num, department, nickname, role_id) 
       VALUES (?, ?, ?, ?, ?, 1)`,
      [email, hashedPassword, student_num, department, nickname]
    );
    
    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      user_id: result.insertId
    });
    
  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({ 
      message: '서버 오류가 발생했습니다.' 
    });
  }
});

module.exports = router;
```

## 📝 필드별 설명

### 필수 필드
1. **email** (VARCHAR 100)
   - 형식: 이메일 형식 검증
   - 유니크: 중복 불가
   - 예시: `student@tukorea.ac.kr`

2. **password** (VARCHAR 255)
   - 길이: 최소 8자 이상 권장
   - 보안: bcrypt 등으로 해싱 필수
   - 저장: 해싱된 비밀번호만 DB에 저장

3. **student_num** (INT)
   - 형식: 숫자만 입력
   - 유니크: 중복 불가
   - 예시: `2021123456`

4. **department** (VARCHAR 50)
   - 형식: 드롭다운에서 선택
   - 리스트: 한국공학대 학과 13개
   - 예시: `컴퓨터공학과`

### 선택 필드
5. **nickname** (VARCHAR 30, NULL 허용)
   - 형식: 최대 30자
   - 중복: NULL은 허용되지만 고유 제약 없음
   - 예시: `코딩왕`

### 자동 생성 필드
6. **user_id** (BIGINT)
   - Auto Increment
   - Primary Key

7. **role_id** (BIGINT)
   - 기본값: 1 (일반 사용자)
   - 관리자: 2 (예시)

8. **create_at, update_at** (DATETIME)
   - 자동 생성 및 갱신

## 🛡️ 보안 고려사항

### 비밀번호 해싱
```javascript
// 프론트엔드에서는 평문 전송
// 백엔드에서 반드시 해싱!
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);
```

### SQL Injection 방지
```javascript
// ❌ 나쁜 예
db.query(`INSERT INTO users (email) VALUES ('${email}')`);

// ✅ 좋은 예 - Prepared Statement 사용
db.query('INSERT INTO users (email) VALUES (?)', [email]);
```

### HTTPS 사용
- 프로덕션 환경에서는 반드시 HTTPS 사용
- 비밀번호가 평문으로 전송되므로 SSL/TLS 필수

## 🧪 테스트 데이터

```javascript
// 테스트용 데이터
const testUser = {
  email: 'test@tukorea.ac.kr',
  password: 'password123!',
  passwordConfirm: 'password123!',
  student_num: '2021123456',
  department: '컴퓨터공학과',
  nickname: '테스트유저'
};
```

## 🔍 에러 처리

### 프론트엔드 유효성 검사
- ✅ 빈 필드 확인
- ✅ 이메일 형식 검증
- ✅ 비밀번호 길이 확인
- ✅ 비밀번호 일치 확인
- ✅ 학번 숫자 형식 확인

### 백엔드 검증
- ✅ 이메일 중복 확인
- ✅ 학번 중복 확인
- ✅ 데이터 타입 검증
- ✅ SQL Injection 방지

### 에러 메시지 예시
```javascript
// 중복 에러
{
  status: 409,
  error: 'email' | 'student_num',
  message: '이미 사용 중인 이메일입니다.'
}

// 유효성 에러
{
  status: 400,
  message: '필수 항목을 모두 입력해주세요.'
}

// 서버 에러
{
  status: 500,
  message: '서버 오류가 발생했습니다.'
}
```

## 📚 추가 기능 구현 가이드

### 1. 이메일 인증
```javascript
// 회원가입 시 인증 코드 발송
router.post('/signup/send-verification', async (req, res) => {
  const { email } = req.body;
  const verificationCode = Math.random().toString(36).substring(2, 8);
  
  // DB에 인증 코드 저장 (TTL 5분)
  await db.query(
    'INSERT INTO email_verifications (email, code, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 5 MINUTE))',
    [email, verificationCode]
  );
  
  // 이메일 발송 (nodemailer 등 사용)
  await sendEmail(email, verificationCode);
  
  res.json({ message: '인증 코드가 발송되었습니다.' });
});
```

### 2. 학번 형식 검증
```javascript
// 한국공학대 학번 형식: YYYYNNNNNN (입학년도 + 번호)
const validateStudentNum = (studentNum) => {
  const year = parseInt(studentNum.toString().substring(0, 4));
  const currentYear = new Date().getFullYear();
  
  if (year < 1990 || year > currentYear) {
    return false;
  }
  
  return /^\d{10}$/.test(studentNum);
};
```

### 3. 닉네임 중복 확인
```javascript
router.get('/check-nickname/:nickname', async (req, res) => {
  const { nickname } = req.params;
  
  const [existing] = await db.query(
    'SELECT user_id FROM users WHERE nickname = ?',
    [nickname]
  );
  
  res.json({ 
    available: existing.length === 0 
  });
});
```

## 🚀 배포 시 체크리스트

- [ ] 환경 변수 설정 (DB 연결 정보)
- [ ] HTTPS 인증서 설정
- [ ] CORS 설정
- [ ] Rate Limiting 적용
- [ ] 로그 시스템 구축
- [ ] 백업 시스템 구축
- [ ] 비밀번호 정책 강화
- [ ] 에러 모니터링 설정

---

Made with ❤️ for TUKether
