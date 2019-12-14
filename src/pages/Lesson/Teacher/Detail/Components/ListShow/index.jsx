import React, { PureComponent } from 'react';
import { Descriptions } from 'antd';
import PropTypes from 'prop-types';

const { Item } = Descriptions;
const items = [
  {
    label: '姓名',
    key: 'name',
  },
  {
    label: '性别',
    key: 'sex',
  },
  {
    label: '视频数',
    key: 'videoCount',
  },
  {
    label: '播放次数',
    key: 'playCount',
  },
  {
    label: '获赞数量',
    key: 'heartCount',
  },
  {
    label: '注册时间',
    key: 'registerTime',
  },
  {
    label: '擅长领域',
    key: 'area',
  },
  {
    label: '执业年限',
    key: 'workTime',
  },
  {
    label: '身份证号',
    key: 'IDnumber',
  },
  {
    label: '手机号',
    key: 'mobile',
  },
];

class ListSearch extends PureComponent {
  static propTypes = {
    detail: PropTypes.object.isRequired,
  };

  render() {
    let { detail } = this.props;
    return (
      <div>
        <Descriptions column={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
          {items.map(({ label, key }) => (
            <Item key={key} label={label}>
              {detail[key]}
            </Item>
          ))}
        </Descriptions>
      </div>
    );
  }
}

export default ListSearch;
