import React, { Component } from 'react';
import { withUser } from "../../Context/UserProvider";

import { addMessage, authenticate, getAuthCookie } from "../../Service/Service";

import * as styles from './NewMessage.module.scss';

class NewMessage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: "",
      parentId: undefined
    };
  }

  messageChangeHandler = value => {
    const { message } = this.state;
    if (value !== message) this.setState({ message: value })
  }

  onSubmitHandler = event => {
    event.preventDefault();
    const { message, parentId } = this.state;
    const { user, toggleLoading } = this.props;
    const newMessage = {
      body: message,
      userId: user.id
    }
    if (parentId) newMessage.parentId = parentId;
    toggleLoading();
    addMessage(newMessage)
    .then(res => {
      toggleLoading();
    })
    .catch(err => {
      toggleLoading();
    })
  };

  render() {
    return (
      <div className={styles.NewMessage}>
        <form onSubmit={this.onSubmitHandler}>
          <label htmlFor="message">
            <b>New Message</b>
          </label>
          <textarea
            placeholder="Message"
            name="message"
            required
            onChange={event => this.messageChangeHandler(event.target.value)}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    )

  }
}

export default withUser(NewMessage);