import React, { Component } from 'react';
import { withUser } from "../../Context/UserProvider";

import { getAllUsers, getAllMessages, getAuthCookie } from "../../Service/Service";

import MessagesGroup from './MessagesGroup/MessagesGroup';
import * as styles from './AllMessages.module.scss';

class AllMessages extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messagesTree: []
    };
  }

  createMessagesTree(messages, users) {
    return messages.reduce((acc, value) => {
      const updatedValue = {
        id: value.id,
        body: value.body,
        username: users.find(user => user.id === value.userId).username,
        date: value.date,
        parentId: value.parentId,
        children: []
      }

      if (!updatedValue.parentId) {
        return acc.concat([updatedValue]);
      } else {
        return this.addValueToTree(acc, updatedValue);
      }
    }, [])
  }

  addValueToTree = (testArray, value) => {    
    if (!testArray.length) {
      return testArray;
    } else {
      const parentIndex = testArray.findIndex(msg => msg.id === value.parentId);
      if (parentIndex >= 0) {        
        return testArray.slice(0, parentIndex).concat([{
          ...testArray[parentIndex],
          children: testArray[parentIndex].children.concat([value])
        }], testArray.slice(parentIndex + 1, testArray.length))
      } else {
        return testArray.map(msg => ({ ...msg, children: this.addValueToTree(msg.children, value)}))
      }
    }
  }

  loadAllMessages = () => {
    getAllUsers()
      .then(res => {
        const users = res.data;
        getAllMessages()
          .then(res => {
            const messagesTree = this.createMessagesTree(res.data, users);
            
            if(JSON.stringify(this.state.messagesTree) !== JSON.stringify(messagesTree)){
              this.setState({ messagesTree: messagesTree })
            }
          });
      });
  }

  componentDidMount() {
    this.loadAllMessages();
  }

  componentDidUpdate() {
    this.loadAllMessages();    
  }

  render() {
    const { messagesTree } = this.state;
    const { toggleLoading } = this.props;
    return (
      <div className={styles.AllMessages}>
        <MessagesGroup msgs={messagesTree} toggleLoading={toggleLoading}/>
      </div>
    )
  }
}

export default withUser(AllMessages);