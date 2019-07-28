// 密码：允许为字母与数字8-32位或者为空
export const PWD_REG = /^[a-z0-9A-Z]{8,32}$/;

// 身份证
export const PID_REG = /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/;

// 邮箱
export const EAMIL_REG = /^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@([A-Za-zd0-9]+[-.])+[A-Za-zd]{2,5}$/;

// 手机号
export const TELPHONE_REG = /^(1[3456789]\d{9}|[0-9]{7}|[0-9]{8})$/;

// 电话/传真
export const PHONE_REG = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;

// 网址
export const URL_REG = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/;

// 正整数
export const POSITIVE_INT_REG = /^[0-9]*[1-9][0-9]*$/;

// 匹配 html 标签
export const FILTER_HTML_REG = /<.+?>(.*?)<\/.+?>/g;

// 匹配中文和中文标点
export const CH_ZN_CHARACTER = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
