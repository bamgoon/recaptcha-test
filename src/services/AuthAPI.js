import axios from 'axios';

const login = async (reqBody) => {
  const { id, pwd, token } = reqBody;

  if (id === 'test' && pwd === '1234') {
    if (token) {
      console.log('token이 있으므로 검증 시작');
      axios
        .post('/recaptcha/api/siteverify', null, {
          params: {
            secret: process.env.REACT_APP_RECAPTCHA_V2_SECRET_KEY,
            response: token,
          },
        })
        .then((res) => {
          if (res.data.success) return true;
          else throw new Error('로그인 실패(봇으로 감지)');
        })
        .catch((err) => {
          throw new Error('로그인 실패(토큰 불일치)');
        });
    } else {
      return true;
    }
  } else throw new Error('로그인 실패(입력 정보 불일치)');
};

const AuthAPI = { login };

export default AuthAPI;
