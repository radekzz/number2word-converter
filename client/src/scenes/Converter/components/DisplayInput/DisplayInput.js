import React, { Component } from 'react';
import './DisplayInput.css'

class DisplayInput extends Component {
    render() {
        return (
            <section className="displayInput">
                <div className="displayInput__typeBox" tabIndex="0">
                    {/* {this.props.inputValues.numbers} */}
                    <p>{this.props.currentMessage}{this.props.inputValues.letters}<span className="displayInput__cursor">|</span></p>
                </div>
                <button 
                    className="displayInput__submit"
                    type="submit"
                    onClick={this.props.submitMessage}>
                </button>
            </section>
        );
    }
}

export default DisplayInput;
