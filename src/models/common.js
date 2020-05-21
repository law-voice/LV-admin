import { NAMESPACE } from '@/actions/common';
import {
  getIndustryList,
  getOccupationList,
  getEducationList,
  getUserCategoryList,
  getNewsTypeList,
  getSourceList,
} from '@/services/common';

const Model = {
  namespace: NAMESPACE,
  state: {
    industryList: [],
    occupationList: [],
    userTypeList: [],
    educationList: [],
  },
  effects: {
    *getIndustryList(_, { call }) {
      const response = yield call(getIndustryList);
      // yield put({
      //   type: 'saveIndustryList',
      //   payload: response.data
      // })
      return response.data;
    },
    *getOccupationList(_, { call }) {
      const response = yield call(getOccupationList);
      // yield put({
      //   type: 'saveOccupationList',
      //   payload: response.data
      // })
      return response.data;
    },
    *getEducationList(_, { call }) {
      const response = yield call(getEducationList);
      // yield put({
      //   type: 'saveEducationList',
      //   payload: response.data
      // })
      return response.data;
    },
    *getUserCategoryList(_, { call }) {
      const response = yield call(getUserCategoryList);
      // yield put({
      //   type: 'saveUserCategoryList',
      //   payload: response.data
      // })
      return response.data;
    },
    *getNewsTypeList(_, { call }) {
      const response = yield call(getNewsTypeList);
      // yield put({
      //   type: 'saveUserCategoryList',
      //   payload: response.data
      // })
      return response.data;
    },
    *getSourceList(_, { call }) {
      const response = yield call(getSourceList);
      // yield put({
      //   type: 'saveUserCategoryList',
      //   payload: response.data
      // })
      return response.data;
    },
  },
  reducers: {
    saveIndustryList(state, { payload }) {
      return {
        ...state,
        industryList: payload,
      };
    },
    saveOccupationList(state, { payload }) {
      return {
        ...state,
        occupationList: payload,
      };
    },
    saveEducationList(state, { payload }) {
      return {
        ...state,
        educationList: payload,
      };
    },
    saveUserCategoryList(state, { payload }) {
      return {
        ...state,
        userTypeList: payload,
      };
    },
  },
};

export default Model;
