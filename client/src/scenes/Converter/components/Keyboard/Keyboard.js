import React, { Component } from 'react';
import KeyboardButton from './components/KeyboardButton/KeyboardButton';

const t9 = [
    { number: '1', letters: [''] },
    { number: '2', letters: ['a', 'b', 'c'] },
    { number: '3', letters: ['d', 'e', 'f'] },
    { number: '4', letters: ['g', 'h', 'i'] },
    { number: '5', letters: ['j', 'k', 'l'] },
    { number: '6', letters: ['m', 'n', 'o'] },
    { number: '7', letters: ['p', 'q', 'r', 's'] },
    { number: '8', letters: ['t', 'u', 'v'] },
    { number: '9', letters: ['w', 'x', 'y', 'z'] }, 
    { number: '|', letters: [''] }, // uppercase
    { number: '0', letters: ['_'] }, // space
    { number: 'X', letters: [''], } // delete
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
    }

    static getDerivedStateFromProps(nextProps) {
        return {
          currentInput: nextProps.currentInputValues
        };
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

    handleButtonClick(buttonProps) {
        switch (buttonProps.number) {
            case '|':
                // TODO: implement uppercasing
                console.log('uppercase it');
                break;
            case 'X':
                this.handleEraseClick();
                break;   
            case '0':
                this.handleSpaceClick();
                break;
            case '1':
                console.log('clicking number 1 does nothing at version 1.0.0, sorry');
                break;
            default:
                this.handleNumberClick(buttonProps.number, buttonProps.letters[0])
        }
    }

    render() {
        return (
            <div>
                {t9.map(item => {
                    return (
                        <KeyboardButton 
                            key={item.number}
                            number={item.number}
                            letters={item.letters}
                            onClick={this.handleButtonClick}
                        />
                    )
                })}
            </div>
        );
    }
}

export default Keyboard;