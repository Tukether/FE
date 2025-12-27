import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import SignupScreen from './components/SignupScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState('login') // 'login' 또는 'signup'

  // 로그인 화면의 회원가입 클릭 핸들러
  const handleGoToSignup = () => {
    setCurrentScreen('signup')
  }

  // 회원가입 화면의 돌아가기 클릭 핸들러
  const handleGoToLogin = () => {
    setCurrentScreen('login')
  }

  return (
    <>
      {currentScreen === 'login' ? (
        <LoginScreen onSignupClick={handleGoToSignup} />
      ) : (
        <SignupScreen onBack={handleGoToLogin} />
      )}
    </>
  )
}

export default App
