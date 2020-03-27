import React, { Component } from 'react';
import { withUser } from "../../../../Context/UserProvider";

import { addMessage, authenticate, getAuthCookie } from "../../../../Service/Service";

import * as styles from './Reply.module.scss';

class Reply extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  messageChangeHandler = value => {
    const { message } = this.state;
    if (value !== message) this.setState({ message: value })
  }

  onSubmitHandler = event => {
    event.preventDefault();
    const { message } = this.state;
    const { user, toggleLoading, parentId, toggleReplay } = this.props;
    const reply = {
      body: message,
      userId: user.id,
      parentId: parentId
    }
    toggleReplay();
    toggleLoading();
    addMessage(reply)
    .then(res => {
      toggleLoading();
    })
    .catch(err => {
      toggleLoading();
    })
  };

  render() {
    const { toggleReplay } = this.props;
    return (
      <div className={styles.Reply}>
        <form onSubmit={this.onSubmitHandler}>
          <textarea
            placeholder="Message"
            name="Reply"
            required
            onChange={event => this.messageChangeHandler(event.target.value)}
          ></textarea>
          <div className={styles.controlls}>
            <button type="submit">Submit</button>
            <button className={styles.cancel} onClick={toggleReplay}>Cancel</button>
          </div>
        </form>
      </div>
    )

  }
}

export default withUser(Reply);