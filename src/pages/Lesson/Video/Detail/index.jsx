import React, { PureComponent } from 'react';
import { Pagination } from 'antd';
import ListShow from './Components/ListShow';
import QuestionAnswer from './Components/QuestionAnswer';
import styles from './index.less';
import { formatDate } from '@/utils/format';

class Index extends PureComponent {
  state = {
    data: {
      id: 1,
      title: '劳动合同',
      type: '劳动法',
      author: '王一',
      publicTime: formatDate(new Date(), 'YYYY-MM-DD'),
      readCount: 3000,
      heartCount: 232,
      src:
        'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    },
  };

  onShowSizeChange = () => {};

  render() {
    return (
      <div>
        <ListShow detail={this.state.data} />
        <div className={styles.playBox}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video className={styles.play} controls="controls" src={this.state.data.src} />
        </div>
        <QuestionAnswer />
        <Pagination
          showSizeChanger
          pageSizeOptions={['10', '20', '30', '40', '50']}
          onShowSizeChange={this.onShowSizeChange}
          defaultCurrent={3}
          total={500}
          style={{ marginTop: '20px' }}
        />
      </div>
    );
  }
}

export default Index;
