import { formatDate } from '@/utils/format';

/**
 * 遍历查找
 * @param {Array<Object>} treeObj 对象数组
 * @param {string} childKey 子节点的key
 * @param {string} matchKey 需要查找的对象属性
 * @param {string} matchValue 需要查找的对象属性的值
 * @param {Array<Object>} pathObj 包含查询路径节点的对象数组
 * @param {Array<Object>} result {pathObj, findObj} 返回路径和最终节点
 * @returns {Array<Object>}
 */
function travelFind(treeObj, childKey, matchKey, matchValue, pathObj = [], result = null) {
  treeObj.forEach(item => {
    if (item[matchKey] === matchValue) {
      // 找到目标节点
      pathObj.push(item);
      result = { pathObj, findObj: Object.assign({}, item) };
    } else if (item[childKey] && item[childKey].length) {
      // 继续遍历
      pathObj.push(item);
      result = travelFind(item[childKey], childKey, matchKey, matchValue, pathObj.slice(), result);
      pathObj.pop();
    }
  });

  return result || {};
}

/**
 * REST 地址拼接
 * @param {string} url 待拼接地址
 * @param {Object} pathParams Rest地址参数
 * @returns {string} rest地址
 */
function urlAssemble(url, pathParams) {
  let _url = url;

  for (const i in pathParams) {
    if (pathParams.hasOwnProperty(i)) {
      const reg = new RegExp(`{${i}}`, 'g');
      if (reg.test(_url)) {
        if (![undefined, null, ''].includes(pathParams[i])) {
          _url = _url.replace(reg, pathParams[i]);
        } else {
          console.warn('URL_ERROR', `地址${url}参数${i}错误`);
        }
      }
    }
  }

  return _url;
}

/**
 * 利用JSON转换对象，模拟深拷贝
 * @param {Object} obj 待拷贝对象
 * @returns {Object} 拷贝对象
 */
function deepAssign(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 判断变量类型
 * @param {Object} _var 变量
 * @returns {string} 变量类型
 */
function getVariableType(_var) {
  return Object.prototype.toString.call(_var).slice(8, -1);
}

/* 判断是否是一个空对象 */
function isEmptyObj(obj) {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== 'object') return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

/**
 * 根据生日计算年龄
 * @param {String | Number | Date} birthday 可传日期字符串、时间戳、日期对象 eg: 1994-01-21 / Date Object /1540881388999
 * @returns {Number} 年龄
 */
function computeAge(birthday) {
  if (!birthday) return '';
  if (typeof birthday === 'string') {
    // 修复safari不支持 'YYYY-MM-DD HH:mm:ss'的bug，将其替换为 'YYYY/MM/DD HH:mm:ss'
    if (/\d{4}-\d{2}-\d{2}.*/.test(birthday)) {
      birthday = birthday.replace(/-/g, '/');
    }
    birthday = new Date(birthday);
  }
  // 判断是否是正确日期
  if (!Number.isFinite(+birthday)) {
    /* eslint:disable no-console: 0 */
    console.warn('The payload expect Date or Date String');
    return '';
  }
  const now = new Date();
  if (birthday > now) {
    throw Error('The payload should be before now');
  }
  const [y1, m1, d1] = formatDate(birthday, 'YYYY-MM-DD')
    .split('-')
    .map(Number);
  const y2 = now.getFullYear();
  const m2 = now.getMonth() + 1;
  const d2 = now.getDate();
  if (m2 > m1 || (m2 === m1 && d2 >= d1)) {
    return y2 - y1;
  }
  return y2 - y1 - 1;
}

/**
 * 时间戳版节流
 * 指定时间内只执行一次，立即执行
 * @param {Functon} fn 要执行的函数
 * @param {Context} context 函数执行的上下文
 * @param {Number} timeout 间隔时间
 * @returns {Function} 节流后的函数
 */
function timeStampThrottle(fn, context, timeout) {
  let lastExcuteTime;

  return function(...args) {
    const interval = Date.now() - lastExcuteTime;

    if (lastExcuteTime && interval < timeout) return;

    fn.apply(context, args);
    lastExcuteTime = Date.now();
  };
}

/**
 * 定时器节流
 * 指定时间内只执行一次，延时执行
 * @param {Functon} fn 要执行的函数
 * @param {Context} context 函数执行的上下文
 * @param {Number} timeout 间隔时间
 * @returns {Function} 节流后的函数
 */
function timerThrottle(fn, context, timeout) {
  let timer;

  return function(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = null;
    }, timeout);
  };
}

/**
 * 复杂版节流
 * 先立即执行一次，中间固定间隔时间执行，最后再执行一次
 * 指定时间内连续触发，第一次立即执行，后续多个触发，只取后续触发的第一个，且延迟时间为(指定时间 - 两次触发间隔时间)
 * @param {Functon} fn 要执行的函数
 * @param {Context} context 函数执行的上下文
 * @param {Number} timeout 间隔时间
 * @returns {Function} 节流后的函数
 */
function complexThrottle(fn, context, timeout) {
  let timer;
  let lastExcuteTime;

  return function(...args) {
    /**
     * 每次执行都记录时间戳，与上一次执行时间戳作比较，计算出准确的延迟时间
     * Q: 为什么这么写
     * A: 思考如下场景: 假设3s内只允许执行一次，相邻两次触发，前一次立即触发执行，2s后触发第二次执行，这时定时器应该延迟1s(3 - 2 = 1)后触发
     */

    function excute() {
      fn.apply(context, args);
      lastExcuteTime = Date.now();
    }

    if (timer) return;

    // 第一次执行
    if (!lastExcuteTime) {
      excute();
    } else {
      const interval = Date.now() - lastExcuteTime;

      if (interval < timeout) {
        timer = setTimeout(function() {
          excute();
          timer = null;
        }, timeout - interval);
      } else {
        excute();
      }
    }
  };
}

/**
 * 节流函数
 * @param {Functon} fn 要执行的函数
 * @param {Context} context 函数执行的上下文
 * @param {Number} timeout 间隔时间
 * @param {Number} mode 通过不同mode拿到不同的节流函数，1: 时间戳版节流，2: 定时器版节流，3：复杂版节流
 * @returns {Function} 节流后的函数
 */
function throttle(fn, context, timeout, mode = 1) {
  let throttleFn;
  switch (mode) {
    case 1:
      throttleFn = timeStampThrottle;
      break;
    case 2:
      throttleFn = timerThrottle;
      break;
    case 3:
      throttleFn = complexThrottle;
      break;
    default:
      throttleFn = timeStampThrottle;
  }
  return throttleFn(fn, context, timeout);
}

// 防抖函数
function debounce(fn, context, timeout) {
  let timer;

  // 利用闭包将内容传递出去
  return function(...args) {
    if (timer) {
      // 清除定时器
      clearTimeout(timer);
    }

    // 设置一个新的定时器
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, timeout);
  };
}

/**
 * 对接口返回的 json 数据再处理
 * @param {object} res
 */
function responsePatch(res) {
  // // console.log(res)
  // 附加字段
  if (typeof res === 'object') {
    if (!res.hasOwnProperty('success') && res.hasOwnProperty('returnCode')) {
      res.success = res.returnCode === 'success';
    }
    if (!res.hasOwnProperty('message') && res.hasOwnProperty('returnMsg')) {
      res.message = res.returnMsg;
    }
  }
  return res;
}

/**
 * 获取对象指定路径的值
 * @param {object} obj 对象
 * @returns {string} 路径
 */
function objectPathValue(obj, path) {
  let rlt;
  const pathArr = typeof path === 'string' ? path.split('.') : path;
  pathArr.foreach((e, i) => {
    if (e !== '') {
      if (i === 0) {
        rlt = obj[e];
      } else {
        rlt = rlt[e];
      }
    }
  });
  return rlt;
}

/**
 * 是否闰年
 * @param {Number} year 年份
 * @returns {Boolean} 是否是闰年的布尔值
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
/**
 * 根据年月获取每月天数
 * @param {Number} year 年份
 * @param {Number} month 月份
 * @returns {Number} 当月的总天数
 */
function getDays(year, month) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      return isLeapYear(year) ? 29 : 28;
    default:
      return 30;
  }
}

/**
 * 根据月数计算天数
 * @param {Number} diffMonthCount 与当前时间的月份之差
 * @returns {Number} 返回期间差距的总天数
 */
function totalDaysOfMonth(diffMonthCount) {
  const d = new Date();
  const currentMonth = d.getMonth() + 1;
  let days = 0;
  for (let i = 1; i <= diffMonthCount; i++) {
    const month = currentMonth - i < 1 ? 12 + currentMonth - i : currentMonth - i;
    days += getDays(d.getFullYear(), month);
  }
  return days;
}

/**
 * 拷贝对象
 * @param {object} obj 拷贝的源对象
 * @param {string} fields 指定返回的新对象的字段
 */
function copyObject(source, fields) {
  if (fields && typeof fields === 'string') {
    fields = fields.split(',');
  }
  if (Array.isArray(fields) && fields.length) {
    return fields.reduce((obj, field) => {
      obj[field] = source[field];
      return obj;
    }, {});
  }
  return deepAssign(source);
}

/**
 * 根据身高、体重计算bmi
 * @param {Number} weight 体重(kg)
 * @param {Number} height 身高(cm)
 */
function getBmi(weight, height) {
  if (!weight || !height) return '';
  const bmi = ((weight / Math.pow(height, 2)) * 10000).toFixed(1);
  return Number.isNaN(bmi) ? '' : bmi;
}

/**
 * 根据腰围、臀围获取腰臀比
 * @param {Number} waist 腰围(cm)
 * @param {Number} hip 臀围(cm)
 */
function getWhr(waist, hip) {
  if (!waist || !hip) return '';
  const whr = (waist / hip).toFixed(2);
  return Number.isNaN(whr) ? '' : whr;
}

/**
 * 得到当前的环境 Windows/ Mac
 */
function getPlatform() {
  const matchResult = navigator.userAgent.match(/(Mac|Windows)\b/g);
  return (matchResult || []).length ? matchResult[0] : 'Windows';
}

/**
 * 判断该值是否有效
 * @param {any} val
 * @returns {boolean}
 */
function isValidValue(val) {
  return Array.isArray(val) ? val.length > 0 : ![undefined, null, ''].includes(val);
}

/**
 * 反转译 html 特殊字符
 * @param {string} html
 * @returns {string}
 */
function decodeHTML(html) {
  if (!html) return '';
  html = html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
  return html;
}
/**
 * 转译 html 特殊字符
 * @param {string} html
 * @returns {string}
 */
function encodeHTML(html) {
  if (!html) return '';
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/ /g, '&nbsp;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
  return html;
}

/**
 * 给小于10的数字补0
 * @param {Number} num 数字
 * @returns {string}
 */
function addZero(num, bit = 2) {
  return String(num).padStart(bit, 0);
}

/**
 * 给一个色值区间，随机生成一个颜色
 * @param {Number} startColor 起始的色值，10进制
 * @param {Number} endColor 结束的色值，10进制
 * @returns 16进制颜色值 eg: #fffff
 */
const getRandomColor = (function() {
  // #000000 的 10 进制值
  const HEXADECIMAL_MIN_VALUE = 0x000000;
  // #ffffff 的 10 进制值
  const HEXADECIMAL_MAX_VALUE = 0xffffff;

  return function(startColor = HEXADECIMAL_MIN_VALUE, endColor = HEXADECIMAL_MAX_VALUE) {
    const num = parseInt(Math.random() * (endColor - startColor)) + startColor;
    return `#${addZero(num.toString(16), 6)}`;
  };
})();

/**
 * 根据文件名得到文件后缀名
 * @param {string} name 文件名
 * @returns {string} 后缀名
 */
function getExtByName(name) {
  if (!name) return name;
  const result = name.match(/(\.[^.?]+)($|\?)/g);
  return result ? RegExp.$1 : '';
}

export {
  travelFind,
  urlAssemble,
  deepAssign,
  getVariableType,
  computeAge,
  isEmptyObj,
  throttle,
  debounce,
  responsePatch,
  objectPathValue,
  isLeapYear,
  getDays,
  totalDaysOfMonth,
  copyObject,
  getBmi,
  getWhr,
  getPlatform,
  isValidValue,
  decodeHTML,
  encodeHTML,
  addZero,
  getRandomColor,
  getExtByName,
};
