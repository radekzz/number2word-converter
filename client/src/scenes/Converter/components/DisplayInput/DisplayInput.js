import React, { Component } from 'react';

class DisplayInput extends Component {
    render() {
        return (
            <div>
                {this.props.inputValues.numbers}
                <br />
                {this.props.inputValues.letters}
                <br />
                Message: 
                {this.props.currentMessage} 
                <br />
                <button 
                    type="submit"
                    onClick={this.props.submitMessage}>
                    Submit
                </button>
            </div>
        );
    }
}

export default DisplayInput;
