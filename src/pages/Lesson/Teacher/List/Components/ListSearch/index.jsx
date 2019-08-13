import React, { PureComponent } from 'react';
import { Row, Col, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
import styles from './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

class ListSearch extends PureComponent {
  state = {
    title: '关于四险一金',
    author: '王一',
    type: '民事',
    start: '2019/01/01',
    end: '2019/01/01',
  };

  onChange = (value, type) => {
    this.setState({
      [type]: value,
    });
  };

  onChangePicker = e => {};

  onSearch = () => {
    this.props.onSearchParam(this.state);
  };

  onReset = () => {
    this.setState({
      title: '',
      author: '',
      type: '',
      start: '2018/01/01',
      end: '2018/01/01',
    });
  };

  render() {
    let { title, author, type, start, end } = this.state;
    return (
      <div className={styles.selectBox}>
        <Row gutter={32}>
          <Col span={6} className={styles.item}>
            <div className={styles.rowBox}>
              <div className={styles.conL}>标题</div>
              <div className={styles.rowCon}>
                <Input placeholder="请输入" value={title} onChange={e => this.onChange(e.target.value, 'title')} />
              </div>
            </div>
          </Col>
          <Col span={6} className={styles.item}>
            <div className={styles.rowBox}>
              <div className={styles.conL}>作者</div>
              <div className={styles.rowCon}>
                <Input placeholder="请输入" value={author} onChange={e => this.onChange(e.target.value, 'author')} />
              </div>
            </div>
          </Col>
          <Col span={6} className={styles.item}>
            <div className={styles.rowBox}>
              <div className={styles.conL}>视频类型</div>
              <div className={styles.rowCon}>
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  value={type}
                  onChange={value => this.onChange(value, 'type')}
                >
                  <Option value="婚姻">婚姻</Option>
                  <Option value="刑事">刑事</Option>
                  <Option value="民事">民事</Option>
                </Select>
              </div>
            </div>
          </Col>
          <Col span={6} className={styles.item}>
            <div className={styles.rowBox}>
              <div className={styles.conL}>发布时间</div>
              <div className={styles.rowCon}>
                <RangePicker
                  size="default"
                  format="YYYY-MM-DD"
                  onChange={this.onChangePicker}
                  value={[moment(start, dateFormat), moment(end, dateFormat)]}
                />
              </div>
            </div>
          </Col>
          <Col span={6} className={styles.item}>
            <div>
              <Button type="primary" icon="search" className={styles.btnMr} onClick={this.onSearch}>
                搜索
              </Button>
              <Button type="primary" onClick={this.onReset}>
                重置
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ListSearch;
