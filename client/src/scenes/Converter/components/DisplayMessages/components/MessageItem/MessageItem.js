import React, { Component } from 'react';
import './MessageItem.css';

class MessageItem extends Component {
    render() {
        return (
            <li className={this.props.position === 'right' ?
                'messageItem messageItem--toRight' : 'messageItem'}>
                <div className="messageItem__avatar"></div>
                <p className="messageItem__text">{this.props.text}</p>
            </li>
        );
    }
}

export default MessageItem;