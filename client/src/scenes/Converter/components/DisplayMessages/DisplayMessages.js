import React, { Component } from 'react';
import MessageItem from './components/MessageItem/MessageItem';

class DisplayMessages extends Component {
  render() {
    return (
        <div>
            DisplayMessages
            <ol>
                {this.props.messages.map((message, i) => {
                    return (
                        <li key={i}>
                            <MessageItem 
                                position={message.position}
                                text={message.text} />
                        </li>
                    )
                })}
            </ol>
        </div>
    );
  }
}

export default DisplayMessages;