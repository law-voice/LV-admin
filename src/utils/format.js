import moment from 'moment';
import { getVariableType, addZero, isValidValue } from './index';

/**
 * 是否是字符串形式的时间戳
 * @param {string} timestamp 时间戳
 * @returns {boolean} 结果
 */
function isTimeStamp(timestamp) {
  return typeof timestamp === 'string' && !/\D/.test(timestamp);
}

/**
 * 处理 'YYYY-MM-DD HH:mm:ss' 格式的日期字符串，转为'YYYY/MM/DD HH:mm:ss'格式
 * safari中new Date()不支持 'YYYY-MM-DD HH:mm:ss'，需将其替换为 'YYYY/MM/DD HH:mm:ss'格式
 * @param {string} dateStr 时间戳
 * @returns {string} 格式化后的日期字符串
 */
function parseDateString(dateStr) {
  if (/\d{4}-\d{2}-\d{2}.*/.test(dateStr)) {
    return dateStr.replace(/-/g, '/');
  }
  return dateStr;
}

/**
 * 格式化数字
 * @param {number|string} number - 要格式化的数字
 * @param {number} [decimalNum=2] - 小数点后保留多少位
 * @param {boolean} [isMillionFormat=true] - 是否添加千分符
 * @returns {string}
 */
export function formatNumber(number, decimalNum = 2, isMillionFormat = true) {
  number = Number(number);
  const numberString = `${parseFloat(number.toFixed(decimalNum))}`;
  const regexp = /^.*\./;
  const decimalString = regexp.test(numberString) ? numberString.replace(regexp, '.') : '';
  let integerString = parseInt(number).toString();
  if (isMillionFormat) {
    integerString = integerString.replace(/(?=(?!^)(\d{3})+$)/g, ',');
  }
  const formatString = integerString + decimalString;
  return formatString;
}

/**
 * 时间戳格式化
 * @param {string | number | Date} date 日期
 * @param {string} format 格式化规则
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  if (!date) return '';
  // 字符串时间戳格式
  if (isTimeStamp(date)) {
    return moment(new Date(Number(date))).format(format);
  }

  if (/\d{4}-\d{2}-\d{2}.*/.test(date)) {
    date = date.replace(/-/g, '/');
  }
  return moment(new Date(date)).format(format);
}

/**
 * 隐藏手机号中间4位
 * @param {string} mobileNo 手机号
 * @returns {string} 隐藏中间4位
 */
export function encryptMobileNo(mobileNo) {
  if (!mobileNo) return '';
  const { length } = mobileNo;
  const start = Math.floor((length - 4) / 2);
  const mobileArr = mobileNo.split('');
  mobileArr.splice(start, 4, '****');
  return mobileArr.join('');
}

/**
 * 将时间戳或日期字符串生成日期对象，兼容safari
 * @param {number | string} date timestamp / dataStr
 */
export function newDate(date) {
  if (!date) return new Date();

  if (getVariableType(date) === 'Date') {
    return date;
  }
  if (getVariableType(date) === 'String') {
    date = parseDateString(date);
  } else if (isTimeStamp(date) || Number.isInteger(date)) {
    date = +date;
  } else {
    console.warn(`所传递的参数 ${date} 必须是个时间戳或者日期字符串`);
    return date;
  }
  return new Date(date);
}

/**
 * 格式化展示时分秒 HH:mm:ss
 * @param {number} seconds 总共的秒数，最小单位为秒，并非当前时间的时间戳
 * @returns {string}
 */
export function formateToHMS(seconds) {
  const h = ~~(seconds / 3600);
  const m = ~~(seconds / 60);
  const s = seconds % 60;
  return [h, m, s].map(addZero).join(':');
}

/**
 * 根据文件大小展示不同的单位
 * @param {number} size size 的最小单位为 B
 * @returns {string}
 */
export function formatSize(size) {
  if (!isValidValue(size)) return '';
  const unitArray = ['B', 'KB', 'M', 'G', 'T'];
  const RATIO = 1024;
  let finallyUnit;

  for (const unit of unitArray) {
    finallyUnit = unit;
    if (size < RATIO) {
      break;
    }
    size /= RATIO;
  }
  return parseFloat(size.toFixed(2)) + finallyUnit;
}

/**
 * 金额转大写
 * @param {string | number} n 金额
 */
export function digitUppercase(n) {
  n = parseFloat(n);
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  const head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  );
}
