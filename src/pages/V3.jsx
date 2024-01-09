import { useState } from 'react';
import AuthAPI from 'services/AuthAPI';

export default function V3() {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [helperText, setHelperText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(process.env.REACT_APP_RECAPTCHA_V3_SITE_KEY, { action: 'login' }).then((token) => {
        AuthAPI.login({ id, pwd, token })
          .then((res) => {
            setHelperText('로그인 성공');
          })
          .catch((err) => {
            console.log(err);
            setHelperText(`아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.`);
          });
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '330px' }}>
      <fieldset>
        <legend>로그인</legend>
        <input type="text" value={id} placeholder="아이디" onChange={(e) => setId(e.target.value)} />
        <input type="password" value={pwd} placeholder="비밀번호" onChange={(e) => setPwd(e.target.value)} />
        <div style={{ whiteSpace: 'pre-wrap', color: 'red', fontSize: '11px' }}>{helperText}</div>
        <button type="submit">로그인</button>
      </fieldset>
    </form>
  );
}
