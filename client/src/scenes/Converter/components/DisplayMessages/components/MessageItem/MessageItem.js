import React, { Component } from 'react';

class MessageItem extends Component {
  render() {
    return (
        <div>{this.props.position} - {this.props.text}</div>
    );
  }
}

export default MessageItem;