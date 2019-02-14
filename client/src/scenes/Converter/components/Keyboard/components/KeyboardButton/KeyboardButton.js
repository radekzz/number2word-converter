import React, { Component } from 'react';

class KeyboardButton extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(props) {
        this.props.onClick(props)
    }

    render() {
        return (
            <button onClick={(e) => this.handleClick(this.props)}>
                <span>{this.props.number}</span>
                <br />
                <span>
                    {this.props.letters.map((l,i) => <span key={i}>{l}</span>)}
                </span>
            </button>
        );
    }
}

export default KeyboardButton;