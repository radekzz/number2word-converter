import React, { Component } from 'react';
import KeyboardButton from './components/KeyboardButton/KeyboardButton';
import './Keyboard.css';

const t9 = [
    { key: '1', letters: ['\u00a0'] },
    { key: '2', letters: ['a', 'b', 'c'] },
    { key: '3', letters: ['d', 'e', 'f'] },
    { key: '4', letters: ['g', 'h', 'i'] },
    { key: '5', letters: ['j', 'k', 'l'] },
    { key: '6', letters: ['m', 'n', 'o'] },
    { key: '7', letters: ['p', 'q', 'r', 's'] },
    { key: '8', letters: ['t', 'u', 'v'] },
    { key: '9', letters: ['w', 'x', 'y', 'z'] }, 
    { key: 'Shift', letters: [''] }, // uppercase
    { key: '0', letters: ['_'] }, // space
    { key: 'Backspace', letters: [''], } // delete
]

class Keyboard extends Component {
    constructor(props) {
        super(props);
        this.handleEraseClick = this.handleEraseClick.bind(this);
        this.handleNumberClick = this.handleNumberClick.bind(this);
        this.handleSpaceClick = this.handleSpaceClick.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeydown);
    }
    
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeydown);
    }

    handleKeydown(event) {       
        this.handleButtonClick(event.key)
    }

    handleEraseClick() {
        const updatedInputValues = {
            numbers: this.props.inputValues.numbers.slice(0, -1),
            letters: this.props.inputValues.letters.slice(0, -1)
        }
        this.props.inputValues.letters ?
            this.props.updateInputValues(updatedInputValues) :
            this.props.deleteWord()
    }

    handleNumberClick(newNumber, newLetter) {
        const updatedInputValues = {
            numbers: this.props.inputValues.numbers + newNumber,
            letters: this.props.inputValues.letters + newLetter
        }
        this.props.updateInputValues(updatedInputValues)
    }

    handleSpaceClick() {
        this.props.inputValues.letters ?
            this.props.addWord(this.props.inputValues.letters) :
            this.props.addWord('')
    }

    handleButtonClick(buttonKey) {
        switch (buttonKey) {
            case 'Shift':
                // TODO: implement uppercasing
                break;
            case 'Backspace':
                this.handleEraseClick();
                break;   
            case '0':
                this.handleSpaceClick();
                break;
            case '1':
                // TODO: implement inserting special characters
                break;
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.handleNumberClick(buttonKey, t9[buttonKey - 1].letters[0]);
                break;
            default:
                return;
        }
    }

    render() {
        return (
            <div className="keyboard">
                {t9.map(button => {
                    return (
                        <KeyboardButton 
                            key={button.key}
                            buttonKey={button.key}
                            letters={button.letters}
                            onKeyboardClick={this.handleButtonClick}
                        />
                    )
                })}
            </div>
        );
    }
}

export default Keyboard;

