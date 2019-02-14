import React, { Component } from 'react';

class Suggestions extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(e) {
        this.props.addWord(e.target.innerText)
    }

    render() {

        return (
            <ul>
                {this.props.suggestions.map((suggestion, i) => {
                    return (
                        <li 
                            key={i}
                            onClick={(e) => this.handleClick(e)}>
                            {suggestion}
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default Suggestions;