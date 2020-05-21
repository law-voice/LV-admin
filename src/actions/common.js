export const NAMESPACE = 'common';

// 获取行业类型
export function GET_INDUSTRY_LIST() {
  return {
    type: `${NAMESPACE}/getIndustryList`,
  };
}

// 获取职业类型
export function GET_OCCUPATION_LIST() {
  return {
    type: `${NAMESPACE}/getOccupationList`,
  };
}

// 获取学历
export function GET_EDUCATION_LIST() {
  return {
    type: `${NAMESPACE}/getEducationList`,
  };
}

// 获取用户类型
export function GET_USERCATEGORY_LIST() {
  return {
    type: `${NAMESPACE}/getUserCategoryList`,
  };
}

// 获取新闻类型
export function GET_NEWSTYPE_LIST() {
  return {
    type: `${NAMESPACE}/getNewsTypeList`,
  };
}

// 获取素材来源类型
export function GET_SOURCE_LIST() {
  return {
    type: `${NAMESPACE}/getSourceList`,
  };
}
