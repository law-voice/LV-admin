import { deepAssign } from '@/utils';

/**
 * 通过Factory返回的对象有两个属性
 * @class
 * @returns {对象的枚举属性}
 * @returns {options} {id, value} 的集合
 */
class Factory {
  /**
   * @constructs Menu
   * @param {Object} config 静态枚举常量
   */
  constructor(config) {
    this.options = [];
    this.config = config;
    Object.keys(config).forEach(key => {
      this.options.push(config[key]);
      this[key] = config[key].value;
    });
  }

  // 根据value查询
  findByValue(value) {
    return this.options.find(item => item.value === value);
  }

  // 根据 key name 查询
  findByKey(keyName) {
    return this.config[keyName];
  }

  /**
   * 过滤集合，默认是为返回 arrKey 中包含的，ignore 为 true 时，则返回不在 arrkey 的集合）
   * @param {array} arrKey - 筛选的 key 数组
   * @param {boolean} ignore - 是否忽略 arrKey ， 返回不在 arrkey 的集合。
   */
  filter(arrKey = [], ignore) {
    const EnumObj = arrKey.reduce(
      (sum, key) => {
        if (ignore) delete sum[key];
        else sum[key] = this.findByKeyName(key);
        return sum;
      },
      ignore ? deepAssign(this.config) : {},
    );
    return new Factory(EnumObj);
  }
}

// ============================ EXAMPLE ============================
// 性别
export const Gender = new Factory({
  MAN: {
    value: 1,
    label: '男',
  },
  WOMAN: {
    value: 0,
    label: '女',
  },
  UNKNOWN: {
    value: 2,
    label: '不详',
  },
});

// Gender: {
//   MAN: 1,
//   WOMAN: 1,
//   UNKNOWN: 2
//   __prop__: {
//     findByValue,
//     findByKey,
//     filter
//   }
// }
