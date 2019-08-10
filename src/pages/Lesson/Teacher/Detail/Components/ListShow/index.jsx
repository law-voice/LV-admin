import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';

class ListSearch extends PureComponent {
  render() {
    return (
      <div className={styles.selectBox}>
        <Row gutter={32}>
          <Col span={6} className={styles.item}>
            <div className={styles.rowBox}>
              <div className={styles.conL}>标题</div>
              <div className={styles.rowCon}>关于应届生入职员工是否有五险一金</div>
            </div>
          </Col>
          <Col span={6} className={styles.item}>
            <div className={styles.rowBox}>
              <div className={styles.conL}>发布人</div>
              <div className={styles.rowCon}>王一</div>
            </div>
          </Col>
          <Col span={6} className={styles.item}>
            <div className={styles.rowBox}>
              <div className={styles.conL}>视频类型</div>
              <div className={styles.rowCon}>劳动保障</div>
            </div>
          </Col>
          <Col span={6} className={styles.item}>
            <div className={styles.rowBox}>
              <div className={styles.conL}>发布时间</div>
              <div className={styles.rowCon}>2019-01-01</div>
            </div>
          </Col>
          <Col span={6} className={styles.item}>
            <div className={styles.rowBox}>
              <div className={styles.conL}>浏览量</div>
              <div className={styles.rowCon}>95486</div>
            </div>
          </Col>
          <Col span={6} className={styles.item}>
            <div className={styles.rowBox}>
              <div className={styles.conL}>获赞</div>
              <div className={styles.rowCon}>20999</div>
            </div>
          </Col>
          <Col span={24} className={styles.item}>
            <div className={styles.rowBox}>
              <div className={styles.conL}>视频简介</div>
              <div className={styles.rowCon}>本视频讲解的是关于应届生入职员工是否有五险一金</div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ListSearch;
