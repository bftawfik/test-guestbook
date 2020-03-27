import React, { Component } from 'react';
import MessagesGroup from '../MessagesGroup/MessagesGroup';

import { deleteMessage, authenticate, getAuthCookie } from "../../../Service/Service";

import * as styles from './Message.module.scss';
import Reply from './Reply/Reply';

class Message extends Component {

  constructor(props) {
    super(props);

    this.state = {
      replay: false
    };
  }

  toggleReplay = () => {
    this.setState({ replay: !this.state.replay });
  }

  deleteSelf = () => {
    const { id, toggleLoading } = this.props;
    toggleLoading();
    deleteMessage(id)
      .then(res => {
        toggleLoading();
      })
      .catch(err => {
        toggleLoading();
      })
  }

  render() {
    const { id, body, username, date, children, toggleLoading } = this.props;
    const { replay } = this.state;
    const dateObj = new Date(date)

    return (
      <div className={styles.Message}>
        <div className={styles.container}>
          <div className={styles.info}>
            <div>owner: {username}</div>
            <div className={styles.date}>Date: {dateObj.toLocaleDateString('en-EG')}<span>{dateObj.toLocaleTimeString('en-EG')}</span></div>
          </div>
          <div className={styles.body}>{body}</div>
          <div className={styles.controlls}>
            <button onClick={this.toggleReplay}>Reply</button>
            <button
              className={styles.delete}
              onClick={this.deleteSelf}
            >Delete</button>
          </div>
          {replay && <Reply parentId={id} toggleLoading={toggleLoading} toggleReplay={this.toggleReplay}/>}
        </div>
        <div className={styles.children}>
          {
            children && < MessagesGroup msgs={children} toggleLoading={toggleLoading}/>
          }
        </div>
      </div>
    )
  }
}
export default Message;