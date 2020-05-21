import request from '@/utils/request';
// import { stringify } from 'qs';

export async function saveLogin(params) {
  return request.post('/law-voice/rest/user/login', {
    data: {
      username: params.username,
      password: params.password,
    },
  });
}

export async function refreshToken() {
  return request.get('/law-voice/rest/user/generateToken');
}
