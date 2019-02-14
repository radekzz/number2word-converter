import React, { Component } from 'react';
import DisplayMessages from './components/DisplayMessages/DisplayMessages';
import DisplayInput from './components/DisplayInput/DisplayInput';
import Suggestions from './components/Suggestions/Suggestions';
import Keyboard from './components/Keyboard/Keyboard';

class Converter extends Component {
    constructor(props) {
        super()
        this.state = {
            messages: [],
            currentMessage: '',
            currentInput: {
                numbers: '',
                letters: ''
            },
            suggestions: ['hello', 'world'],
            wordChosen: null
        }

        this.updateCurrentInput = this.updateCurrentInput.bind(this)
        this.addWord = this.addWord.bind(this);
        this.deleteWord = this.deleteWord.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }

    updateCurrentInput(newValues) {
        this.setState({currentInput: newValues})
    }

    addWord(word) {
        this.setState(prevState => ({
            currentMessage: prevState.currentMessage ? 
                prevState.currentMessage + word + ' ' :
                word + ' ',
            currentInput: {
                numbers: '',
                letters: ''
            },
            suggestions: []
        }))
    }

    deleteWord() {
        const currentMessage = this.state.currentMessage;

        if (currentMessage) {
            /*
            * If the current message is not already empty, 
            * its last character will be an empty space. 
            * This function deletes the empty space on the first run 
            * and its last word on the second run.
            */
            if (currentMessage.endsWith(' ')) {
                this.setState(state => {
                    return {
                        currentMessage: state.currentMessage.replace(/\s$/g, '')
                    }
                })
            } else {
                const lastWordIndex = currentMessage.lastIndexOf(" ") + 1;

                this.setState(state => {
                    return {
                        currentMessage: state.currentMessage.substring(0, lastWordIndex)
                    }
                })
            }
        }
    }

    submitMessage() {
        const messages = this.state.messages;
        messages.push({
            position: 'right',
            text: (this.state.currentMessage + this.state.currentInput.letters).trim()
        })
        this.setState({
            messages,
            currentMessage: '',
            currentInput: { numbers: '', letters: '' }
        })
    }

    render() {
        return (
            <div>
                <DisplayMessages messages={this.state.messages} />
                <DisplayInput 
                    currentMessage={this.state.currentMessage}
                    currentInput={this.state.currentInput}
                    submitMessage={this.submitMessage} />
                <Suggestions 
                    suggestions={this.state.suggestions}
                    addWord={this.addWord} />
                <Keyboard 
                    addWord={this.addWord}
                    deleteWord={this.deleteWord}
                    currentInputValues={this.state.currentInput}
                    updateCurrentInput={this.updateCurrentInput} />
            </div>
        );
    }
}

export default Converter;