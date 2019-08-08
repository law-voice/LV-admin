import React from 'react';
import { Modal, Input, Select } from 'antd';
import styles from './index.less';

const { Option } = Select;

class MyModel extends React.Component {
  static getDerivedStateFromProps(props, state) {
    return JSON.stringify(props.form) === JSON.stringify(state.form)
      ? state
      : {
          ...state,
          form: { ...props.form },
        };
  }

  state = {
    form: {},
  };

  onChange = (val, type) => {
    const { form } = this.state;
    const newForm = {
      ...form,
      [type]: val,
    };
    this.props.onFormChange(newForm);
  };

  render() {
    let { title, author, type } = this.state.form;
    let { visible, onOk, onHide } = this.props;
    return (
      <Modal title="Basic Modal" centered visible={visible} onOk={onOk} onCancel={onHide}>
        <div className={styles.rowBox}>
          <span className={styles.paramName}>标题</span>
          <Input
            className={styles.rowCon}
            placeholder="title"
            value={title}
            onChange={e => this.onChange(e.target.value, 'title')}
          />
        </div>
        <div className={styles.rowBox}>
          <span className={styles.paramName}>作者</span>
          <Input
            className={styles.rowCon}
            placeholder="author"
            value={author}
            onChange={e => this.onChange(e.target.value, 'author')}
          />
        </div>
        <div className={styles.rowBox}>
          <span className={styles.paramName}>视频类型</span>
          <Select
            showSearch
            style={{ width: '84%' }}
            placeholder="Select a type"
            value={type}
            onChange={value => this.onChange(value, 'type')}
          >
            <Option value="婚姻">婚姻</Option>
            <Option value="刑事">刑事</Option>
            <Option value="民事">民事</Option>
          </Select>
        </div>
      </Modal>
    );
  }
}

export default MyModel;
