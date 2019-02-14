import React, { Component } from 'react';
import DisplayMessages from './components/DisplayMessages/DisplayMessages';
import DisplayInput from './components/DisplayInput/DisplayInput';
import Suggestions from './components/Suggestions/Suggestions';
import Keyboard from './components/Keyboard/Keyboard';
import apiService from '../../services/api';

class Converter extends Component {
    constructor(props) {
        super()
        this.state = {
            messages: [],
            currentMessage: '',
            inputValues: {
                numbers: '',
                letters: ''
            },
            suggestions: [],
            wordChosen: null
        }

        this.updateInputValues = this.updateInputValues.bind(this)
        this.addWord = this.addWord.bind(this);
        this.deleteWord = this.deleteWord.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }

    async fetchSuggestions(numbers) {
        try {
            const response = await apiService.fetchFilteredT9conversions({numericString: numbers});
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);
            this.setState({ suggestions: body.words })
        } catch (err) {
            console.log(err)
        }
    }

    updateInputValues(newValues) {
        this.setState({inputValues: newValues})

        newValues.numbers ?
            this.fetchSuggestions(newValues.numbers) :
            this.setState({suggestions: []})
    }

    addWord(word) {
        this.setState(prevState => ({
            currentMessage: prevState.currentMessage ? 
                prevState.currentMessage + word + ' ' :
                word + ' ',
            inputValues: {
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
            text: (this.state.currentMessage + this.state.inputValues.letters).trim()
        })
        this.setState({
            messages,
            currentMessage: '',
            inputValues: { numbers: '', letters: '' }
        })
    }

    render() {
        return (
            <div>
                <DisplayMessages messages={this.state.messages} />
                <DisplayInput 
                    currentMessage={this.state.currentMessage}
                    inputValues={this.state.inputValues}
                    submitMessage={this.submitMessage} />
                <Suggestions 
                    suggestions={this.state.suggestions}
                    addWord={this.addWord} />
                <Keyboard 
                    addWord={this.addWord}
                    deleteWord={this.deleteWord}
                    inputValues={this.state.inputValues}
                    updateInputValues={this.updateInputValues} />
            </div>
        );
    }
}

export default Converter;

// test

// it should render coponents
//

// updateCurrentInput, if the newvalues.numbers are currently empty,
// empty the suggestion, otherwise trigger fetch with new values

// addWord, inserting space logic, emptying suggestions and currentinput

// deleteword, delete the word only if there is something to delete - current message
// is not empty
// deleteWord, delete an empty space if there is any in the the current mess
// otherwise delete the last word of the current message

// submitMessage, emty currentmessage and current input