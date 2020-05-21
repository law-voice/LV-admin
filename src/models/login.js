import { setAuthority, setToken, removeToken, setRefreshToken } from '@/utils/authority';
// import { reloadAuthorized } from '@/utils/Authorized';
import { NAMESPACE } from '@/actions/login';
import { saveLogin, refreshToken } from '@/services/login';
import router from 'umi/router';

const Model = {
  namespace: NAMESPACE,
  state: {},
  effects: {
    *login({ payload }, { call }) {
      // select 的使用方法：https://blog.csdn.net/weixin_40792878/article/details/82051078
      const response = yield call(saveLogin, payload);
      setToken(response.data.access.access_token);
      setRefreshToken(response.data.refresh.refresh_token);
      localStorage.setItem('accessEndTime', response.data.access.time_out);
      // setAuthority('admin');
      // reloadAuthorized();
      router.replace('/');
    },
    logout() {
      removeToken();
      setAuthority('');
      router.replace('/login');
    },
    *refreshToken(_, { call }) {
      const response = yield call(refreshToken);
      setToken(response.data.access.access_token);
      setRefreshToken(response.data.refresh.refresh_token);
      localStorage.setItem('refreshEndTime', response.data.refresh.time_out);
    },
  },
  reducers: {},
};
export default Model;
