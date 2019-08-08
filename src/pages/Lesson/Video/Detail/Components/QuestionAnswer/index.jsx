import React, { PureComponent } from 'react';
import { Comment, Icon, Tooltip, Avatar } from 'antd';
import styles from './index.less';

class QuestionAnswer extends PureComponent {
  state = {
    questions: 256,
  };

  render() {
    const actions = [
      <span>
        <Tooltip title="同问人数">
          <Icon type="question-circle" theme="outlined" />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'default' }}>{this.state.questions}</span>
      </span>,
      <span>Reply to</span>,
    ];
    return (
      <div>
        <Comment
          actions={actions}
          author={<a>Han Solo</a>}
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
          content={
            <p>
              We supply a series of design principles, practical patterns and high quality design resources (Sketch and
              Axure), to help people create their product prototypes beautifully and efficiently.
            </p>
          }
        />
      </div>
    );
  }
}

class QuestionAnswerGroup extends PureComponent {
  render() {
    return (
      <div className={styles.qaBox}>
        <p className={styles.title}>问答</p>
        <QuestionAnswer />
        <QuestionAnswer />
      </div>
    );
  }
}

export default QuestionAnswerGroup;
