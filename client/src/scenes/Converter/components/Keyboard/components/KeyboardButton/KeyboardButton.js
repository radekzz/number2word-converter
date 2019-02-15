import React, { Component } from 'react';
import './KeyboardButton.css'

const cssClass = (buttonKey) => {
    if (buttonKey === 'Backspace') {
        return 'keyboardButton keyboardButton--backspace keyboardButton--textHidden';
    } else if (buttonKey === 'Shift') {
        return 'keyboardButton keyboardButton--shift keyboardButton--textHidden';
    } else if (buttonKey === '0') {
        return 'keyboardButton keyboardButton--space';
    } else {
        return 'keyboardButton';
    }
}

class KeyboardButton extends Component {
    render() {
        return (
            <button 
                className={cssClass(this.props.buttonKey)}
                onClick={(e) => this.props.onKeyboardClick(this.props.buttonKey)}>
                <span className="keyboardButton__number">{this.props.buttonKey}</span>
                <br />
                <span>
                    {this.props.letters.map((l,i) => <span key={i}>{l}</span>)}
                </span>
            </button>
        );
    }
}

export default KeyboardButton;