import React, { Component } from 'react';
import { Descriptions, Divider, Tabs } from 'antd';
import Reply from './components/Comment';
import Vote from './components/Vote';
import Statistic from './components/Statistic';

import { formatDate } from '@/utils/format';
import style from './index.less';

const { TabPane } = Tabs;
const items = [
  {
    label: '标题',
    prop: 'title',
  },
  {
    label: '来源',
    prop: 'source',
  },
  {
    label: '类型',
    prop: 'type',
  },
  {
    label: '发布时间',
    prop: 'publicTime',
  },
  {
    label: '浏览量',
    prop: 'readCount',
  },
  {
    label: '评论数',
    prop: 'replyCount',
  },
  {
    label: '投票总数',
    prop: 'voteCount',
  },
];

function Article({ content }) {
  // 处理 xss
  const html = {
    __html: content,
  };
  /* 富文本展示？ */
  return <div className={style.content} dangerouslySetInnerHTML={html} />;
}

class Detail extends Component {
  state = {
    data: {
      id: 1,
      title: '震惊，竟然发生这种事情',
      type: '社会',
      source: '人民日报',
      publicTime: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      readCount: 3000,
      replyCount: 232,
      voteCount: 36,
      content: `<h1>实时现场</h1>
      <p>新闻画面显示，王秀彬少将已佩戴副战区级资历章，与东部战区副司令孙和荣中将并列而坐。</p>

      <p>据公开资料，王秀斌为本科学历，参加过边境防御作战，曾荣立一等功一次，被评为全国学雷锋标兵。</p>

      <p>他长期在原南京军区第1集团军任职，历任团参谋长、团长、师参谋长、第一机步师师长等职，后调任原南京军区第31集团军副军长。</p>

      <p>2015年，王秀斌回归原第1集团军，任副军长，并成为“9·3大阅兵”的将军领队。</p>

      <p>受领阅兵任务后，年龄和不少战士父辈相仿的王秀斌每天强忍髋骨损伤积液的伤痛，捆着护具进行超负荷训练，达到了动作协调、口令精确、形象大方的标准要求，受到阅兵徒步方队指挥部首长的多次表扬。</p>
      <div class="tc">
        <img src="//n.sinaimg.cn/news/crawl/97/w550h347/20190813/af89-icapxpi0805628.jpg" alt="王秀斌与周夕根">
        <h4 class="mt8"><span>王秀斌与周夕根</span></h4>
      </div>
      `,
    },
  };

  tabs = [
    {
      label: '正文',
      Component: <Article content={this.state.data.content} />,
    },
    {
      label: '评论',
      Component: <Reply id={this.state.data.id} />,
    },
    {
      label: '投票',
      Component: <Vote id={this.state.data.id} />,
    },
    {
      label: '统计',
      Component: <Statistic id={this.state.data.id} />,
    },
  ];

  render() {
    return (
      <div>
        <Descriptions title="新闻详情" column={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
          {items.map(({ label, prop }) => (
            <Descriptions.Item key={prop} label={label}>
              {this.state.data[prop]}
            </Descriptions.Item>
          ))}
        </Descriptions>
        <Tabs>
          {this.tabs.map(({ label, Component: itemComponent }) => (
            <TabPane tab={label} key={label}>
              {itemComponent}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Detail;
