import React, { Component } from 'react';
import Message from '../Message/Message';

export default ({ msgs, toggleLoading }) => {
  return (
    <React.Fragment>
      {
        msgs.map((msg, ndx) => <Message {...msg} key={ndx} toggleLoading={toggleLoading}/>)
      }
    </React.Fragment>
  )
}