import { useEffect, useRef, useState } from 'react';
import AuthAPI from 'services/AuthAPI';

const MAX_LOGIN_ATTEMPTS = 3;

export default function V2() {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [helperText, setHelperText] = useState('');

  const [isReCaptcha, setIsReCaptcha] = useState(false);
  const [count, setCount] = useState(0);

  const rcWidget = useRef(null);
  const rcWidgetId = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let token;
    if (isReCaptcha) {
      token = window.grecaptcha.getResponse(rcWidgetId.current);
      window.grecaptcha.reset(rcWidgetId.current);
    }

    AuthAPI.login({ id, pwd, token })
      .then((res) => {
        setCount(0);
        setIsReCaptcha(false);
        setHelperText('로그인 성공');
      })
      .catch((err) => {
        console.log(err);
        setCount((prev) => prev + 1);
        setHelperText(`아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.`);
      });
  };

  useEffect(() => {
    if (count >= MAX_LOGIN_ATTEMPTS) {
      setIsReCaptcha(true);
      setHelperText(
        `아이디 또는 비밀번호를 ${MAX_LOGIN_ATTEMPTS}회 이상 잘못 입력했습니다.\nReCAPTCHA 체크박스를 선택한 후 로그인을 진행해 주세요.`,
      );
    }
  }, [count]);

  useEffect(() => {
    if (!isReCaptcha) return;
    rcWidgetId.current = window.grecaptcha.render(rcWidget.current, {
      sitekey: process.env.REACT_APP_RECAPTCHA_V2_SITE_KEY,
    });
  }, [isReCaptcha]);

  return (
    <form onSubmit={handleSubmit} style={{ width: '330px' }}>
      <fieldset>
        <legend>로그인</legend>
        <input type="text" value={id} placeholder="아이디" onChange={(e) => setId(e.target.value)} />
        <input type="password" value={pwd} placeholder="비밀번호" onChange={(e) => setPwd(e.target.value)} />
        <div style={{ whiteSpace: 'pre-wrap', color: 'red', fontSize: '11px' }}>{helperText}</div>
        {isReCaptcha && <div ref={rcWidget} />}
        <button type="submit">로그인</button>
      </fieldset>
    </form>
  );
}
