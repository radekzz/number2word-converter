import React, { Component } from 'react';
import KeyboardButton from './components/KeyboardButton/KeyboardButton';

const t9 = [
    { key: '1', letters: [''] },
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
        this.state = {
            currentInput: {
                numbers: this.props.currentInputValues.numbers,
                letters: this.props.currentInputValues.letters
            }
        }

        this.handleEraseClick = this.handleEraseClick.bind(this);
        this.handleNumberClick = this.handleNumberClick.bind(this);
        this.handleSpaceClick = this.handleSpaceClick.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    static getDerivedStateFromProps(nextProps) {
        return {
          currentInput: nextProps.currentInputValues
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeydown);
    }
    
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeydown);
    }

    handleEraseClick() {
        const updatedInputValues = {
            numbers: this.state.currentInput.numbers.slice(0, -1),
            letters: this.state.currentInput.letters.slice(0, -1)
        }
        this.state.currentInput.letters ?
            this.props.updateCurrentInput(updatedInputValues) :
            this.props.deleteWord()
    }

    handleNumberClick(newNumber, newLetter) {
        const updatedInputValues = {
            numbers: this.state.currentInput.numbers + newNumber,
            letters: this.state.currentInput.letters + newLetter
        }
        this.props.updateCurrentInput(updatedInputValues)
    }

    handleSpaceClick() {
        this.state.currentInput.letters ?
            this.props.addWord(this.state.currentInput.letters) :
            this.props.addWord('')
    }

    handleKeydown(event) {       
        this.handleButtonClick(event.key)
    }

    handleButtonClick(buttonKey) {
        switch (buttonKey) {
            case 'Shift':
                // TODO: implement uppercasing
                console.log('uppercase it');
                break;
            case 'Backspace':
                this.handleEraseClick();
                break;   
            case '0':
                this.handleSpaceClick();
                break;
            case '1':
                console.log('clicking number 1 does nothing at version 1.0.0, sorry');
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
            <div>
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