import axios from 'axios';
import { useState } from 'react';

import { styles } from './SignInModal.styles';
import {
  getEmailVerification,
  postCheckEmailVerification,
  postRegisterMember,
  getDuplicateEmail,
  postLogin,
} from '../../../features/auth/auth.api';
import { useAuthStore } from '../../../features/auth/auth.store';

export function SignInModal() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const { login } = useAuthStore();

  const handleSendVerificationCode = async () => {
    try {
      const duplicateResponse = await getDuplicateEmail({ email });
      if (!duplicateResponse.data) {
        alert('이미 사용 중인 이메일입니다.');
        setIsEmailDuplicate(true);
      } else {
        await getEmailVerification({ email });
        console.log('이메일 인증 코드 발송');
        setIsEmailDuplicate(false);
      }
    } catch (error) {
      console.error('인증 코드 발송 실패', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await postCheckEmailVerification({ email, uuid: verificationCode });
      if (response.data) {
        setIsEmailVerified(true);
      } else {
        alert('인증 코드가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('인증 코드 검증 실패', error);
      alert('인증 코드 검증 실패');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await postRegisterMember({ email, password, name: nickname });
      if (response.data) {
        console.log('회원가입 성공');
        setIsSignUp(false);
        resetForm();
      } else {
        alert('회원가입 실패');
      }
    } catch (error) {
      console.error('회원가입 실패', error);
      alert('회원가입 실패');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await postLogin({ email: loginEmail, password: loginPassword });
      login(response);
      axios.defaults.headers.common.Authorization = `Bearer ${response}`;
      console.log('로그인 성공');
    } catch (error) {
      console.error('로그인 실패', error);
      alert('로그인 실패');
    }
  };

  const resetForm = () => {
    setIsEmailVerified(false);
    setVerificationCode('');
    setPassword('');
    setNickname('');
    setEmail('');
    setIsEmailDuplicate(false);
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    resetForm();
  };

  return (
    <styles.container>
      {isSignUp && !isEmailVerified && (
        <>
          <styles.input type='email' placeholder='이메일' value={email} onChange={(e) => setEmail(e.target.value)} />
          <styles.button onClick={handleSendVerificationCode} disabled={isEmailDuplicate}>
            인증 코드 발송
          </styles.button>
          <styles.input
            type='text'
            placeholder='인증 코드'
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <styles.button onClick={handleVerifyCode}>인증 코드 확인</styles.button>
        </>
      )}
      {isSignUp && isEmailVerified && (
        <>
          <styles.input
            type='text'
            placeholder='닉네임'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <styles.input
            type='password'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <styles.button onClick={handleRegister} disabled={!nickname || !password}>
            회원가입
          </styles.button>
        </>
      )}
      {!isSignUp && (
        <>
          <styles.input
            type='email'
            placeholder='이메일'
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <styles.input
            type='password'
            placeholder='비밀번호'
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <styles.button onClick={handleLogin}>로그인</styles.button>
        </>
      )}
      <styles.toggleText onClick={toggleSignUp}>{isSignUp ? '로그인' : '회원가입'}</styles.toggleText>
    </styles.container>
  );
}
