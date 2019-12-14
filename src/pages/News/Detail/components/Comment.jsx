import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Icon, List, Button } from 'antd';
import router from 'umi/router';

import FilterList from '@/components/common/FilterList';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default class Comment extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  componentDidMount() {
    // dispatch query
    console.log(this.props.id);
  }

  api = async () =>
    // TODO: 后续改为真实接口、真实数据
    new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: {
            items: [
              {
                key: 1,
                id: 1,
                name: '张光崇',
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
                content:
                  'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                gender: '男',
                job: '律师',
                like: 3000,
                hate: 200,
                time: '2018-03-12 20:30:15',
              },
            ],
            pageBean: {
              pageNo: 1,
              pageSize: 10,
              total: 100,
            },
          },
        });
      }, 300);
    });

  jumpToCommentList = () => {
    router.push({
      pathname: '/news/comments',
    });
  };

  render() {
    return (
      <FilterList
        type="list"
        api={this.api}
        listProps={{
          itemLayout: 'vertical',
          size: 'large',
          pagination: false,
          renderItem: item => (
            <List.Item
              key={item.title}
              actions={[
                <IconText type="like-o" text={item.like} key="list-vertical-like-o" />,
                <IconText type="star-o" text={item.hate} key="list-vertical-star-o" />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={
                  <>
                    <a href={item.href}>{item.name}</a> <span className="ml8 c9 f12">{item.time}</span>
                  </>
                }
              />
              {item.content}
            </List.Item>
          ),
          footer: (
            <Button type="primary" block onClick={this.jumpToCommentList}>
              管理全部评论
            </Button>
          ),
        }}
      />
    );
  }
}
