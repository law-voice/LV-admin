import { NAMESPACE } from '@/actions/news';
import { getNewsList } from '@/services/news';

const UserModel = {
  namespace: NAMESPACE,
  state: {
    newsList: {
      items: [],
      pageBean: {},
    },
    detail: {},
  },
  effects: {
    *getNewsList({ payload }, { call }) {
      const response = yield call(getNewsList, payload.params);
      // yield put({
      //   type: 'saveList',
      //   payload: { ...response.data }
      // });
      return response;
      // return {
      //   items: response.data.list,
      //   pageBean: response.data.pageBean,
      // }
    },
  },
  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        userList: {
          items: payload.list,
          pageBean: payload.pageBean,
        },
      };
    },
  },
};
export default UserModel;
