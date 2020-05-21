// import request from '@/utils/request';
// import { stringify } from 'qs';

export async function getNewsList(params) {
  let newsList = [];
  for (let i = 1; i < 59; i++) {
    // let source, publishTime;
    // if (i % 3 === 0) {
    //   source = '人民日报';
    //   publishTime = '2017-08-03';
    // } else if (i % 3 === 1) {
    //   source = '新华社';
    //   publishTime = '2018-09-14';
    // } else {
    //   source = '广电';
    //   publishTime = '2019-10-25';
    // }
    newsList.push({
      key: `1${i}`,
      id: i,
      title: `震惊，竟然发生这种事情${i}`,
      type: '社会',
      source: i % 3 === 0 ? '人民日报' : i % 3 === 1 ? '广电' : '新华社',
      publishTime: i % 3 === 0 ? '2017-08-03' : i % 3 === 1 ? '2018-08-03' : '2019-08-03',
      readCount: 10 * i,
      replyCount: 4 * i,
      voteCount: 8 * i,
    });
  }
  //   return request.get(`/law-voice/rest/news/newsList?${stringify(params)}`);
  const response = {
    data: {
      list: newsList,
      pageBean: {
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        total: newsList.length,
      },
    },
  };
  return response;
}
