import React, { Component } from 'react';

class KeyboardButton extends Component {
    render() {
        return (
            <button onClick={(e) => this.props.onKeyboardClick(this.props.buttonKey)}>
                <span>{this.props.buttonKey}</span>
                <br />
                <span>
                    {this.props.letters.map((l,i) => <span key={i}>{l}</span>)}
                </span>
            </button>
        );
    }
}

export default KeyboardButton;