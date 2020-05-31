import { NAMESPACE } from '@/actions/customer';
import { getCustomerList } from '@/services/customer';

const UserModel = {
  namespace: NAMESPACE,
  state: {
    customerList: {
      items: [],
      pageBean: {},
    },
    detail: {},
  },
  effects: {
    *getCustomerList({ payload }, { call }) {
      const response = yield call(getCustomerList, payload.params);
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
        customerList: {
          items: payload.list,
          pageBean: payload.pageBean,
        },
      };
    },
  },
};
export default UserModel;
