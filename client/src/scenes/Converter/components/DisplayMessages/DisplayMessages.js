import React, { Component } from 'react';
import MessageItem from './components/MessageItem/MessageItem';
import './DisplayMessages.css'

class DisplayMessages extends Component {
    render() {
        return (
            <div className="displayMessages">
                <ol className="displayMessages__list">
                    <MessageItem
                        position="left"
                        text="Hey there! May I help you?" />
                    <MessageItem
                        position="right"
                        text="Hello, i have a question..." />
                    {this.props.messages.map((message, i) => {
                        return (
                            <MessageItem
                                key={i}
                                position={message.position}
                                text={message.text} />
                        )
                    })}
                </ol>
            </div>
        );
    }
}

export default DisplayMessages;