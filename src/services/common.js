// import request from '@/utils/request';
// import { stringify } from 'qs';

// 行业类型
export async function getIndustryList() {
  // return request.get('/law-voice/rest/user/industryAndOccupationList');
  const response = {
    data: [
      { name: '金融', value: 1 },
      { name: '法律', value: 2 },
      { name: '教育', value: 3 },
    ],
  };
  return response;
}

// 职业类型
export async function getOccupationList() {
  // return request.get('/law-voice/rest/user/occupationList');
  const response = {
    data: [
      { name: '教师', value: 1 },
      { name: '律师', value: 2 },
      { name: '医学工作者', value: 3 },
    ],
  };
  return response;
}
// 学历类型
export async function getEducationList() {
  // return request.get('/law-voice/rest/user/industryAndOccupationList');
  const response = {
    data: [
      { name: '博士及以上', value: 1 },
      { name: '硕士', value: 2 },
      { name: '本科', value: 3 },
      { name: '高中', value: 4 },
      { name: '初中及以下', value: 5 },
    ],
  };
  return response;
}
// 用户类型
export async function getUserCategoryList() {
  // return request.get('/law-voice/rest/user/industryAndOccupationList');
  const response = {
    data: [
      { name: '普通用户', value: 1 },
      { name: '法律专业人士', value: 2 },
    ],
  };
  return response;
}
// 新闻类型
export async function getNewsTypeList() {
  // return request.get('/law-voice/rest/user/industryAndOccupationList');
  const response = {
    data: [
      { name: '刑事类', value: 1 },
      { name: '民商类', value: 2 },
      { name: '行政类', value: 3 },
    ],
  };
  return response;
}
// 新闻类型
export async function getSourceList() {
  // return request.get('/law-voice/rest/user/industryAndOccupationList');
  const response = {
    data: [
      { name: '人民日报', value: 1 },
      { name: '新华社', value: 2 },
      { name: '广电', value: 3 },
    ],
  };
  return response;
}
