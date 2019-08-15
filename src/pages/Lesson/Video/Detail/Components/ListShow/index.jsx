import React, { PureComponent } from 'react';
import { Descriptions } from 'antd';
import PropTypes from 'prop-types';

const { Item } = Descriptions;
const items = [
  {
    label: '标题',
    key: 'title',
  },
  {
    label: '作者',
    key: 'author',
  },
  {
    label: '类型',
    key: 'type',
  },
  {
    label: '发布时间',
    key: 'publicTime',
  },
  {
    label: '浏览量',
    key: 'readCount',
  },
  {
    label: '获赞数',
    key: 'heartCount',
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
