import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Keyboard from './Keyboard';
import KeyboardButton from './components/KeyboardButton/KeyboardButton';

configure({adapter: new Adapter()});

describe('<Keyboard />', () => {
    let wrapper;

    const props = {
        inputValues: {
            numbers: '2',
            letters: 'a'
        },
        addWord: jest.fn(),
        deleteWord: jest.fn(),
        updateInputValues: jest.fn()
    }

    const handleSpaceClickMethod = jest.spyOn(Keyboard.prototype, 'handleSpaceClick');
    const handleEraseClickMethod = jest.spyOn(Keyboard.prototype, 'handleEraseClick');
    const handleNumberClickMethod = jest.spyOn(Keyboard.prototype, 'handleNumberClick');
    
    beforeEach(() => {
        wrapper = shallow(<Keyboard {...props} />);
    });

    it('renders KeyboardButton component 12 times', () => {
        expect(wrapper.find(KeyboardButton)).toHaveLength(12);
    });

    // testing handleButtonClick with different arguments

    it('handleButtonClick called with any unsupported character should NOT call any handler', () => {
        wrapper.instance().handleButtonClick('p')
        wrapper.instance().handleButtonClick('Enter')
        wrapper.instance().handleButtonClick('Space')
        wrapper.instance().handleButtonClick(']')
        expect(handleSpaceClickMethod).not.toHaveBeenCalled();
        expect(handleEraseClickMethod).not.toHaveBeenCalled();
        expect(handleNumberClickMethod).not.toHaveBeenCalled();
    });

    it('handleButtonClick called with 0 should call handleSpaceClick', () => {
        wrapper.instance().handleButtonClick('0')
        expect(handleSpaceClickMethod).toHaveBeenCalled();
        handleSpaceClickMethod.mockReset();
        handleSpaceClickMethod.mockRestore();
    });
    it('handleButtonClick called with Backspace should call handleEraseClick', () => {
        wrapper.instance().handleButtonClick('Backspace')
        expect(handleEraseClickMethod).toHaveBeenCalled();
        handleEraseClickMethod.mockReset();
        handleEraseClickMethod.mockRestore();
    });
    it('handleButtonClick called with a number should call handleNumberClick with associated T9 value pair', () => {
        wrapper.instance().handleButtonClick('5')
        expect(handleNumberClickMethod).toHaveBeenCalledWith('5', 'j');
        handleNumberClickMethod.mockReset();
        handleNumberClickMethod.mockRestore();
    });

    // testing individual handlers separately

    it('calling handleSpaceClick - while props.inputValues.letters are NOT empty - should call addWord with props.inputValues.letters', () => {
        wrapper.setProps({inputValues: {numbers: '23', letters: 'ad'}})
        wrapper.instance().handleSpaceClick();
        expect(props.addWord).toHaveBeenCalledWith(props.inputValues.letters);
    });
    it('calling handleSpaceClick - while props.inputValues.letters are empty - should call addWord with empty string', () => {
        wrapper.setProps({inputValues: {numbers: '', letters: ''}})
        wrapper.instance().handleSpaceClick();
        expect(props.addWord).toHaveBeenCalledWith('');
    });
    it('calling handleEraseClick - while props.inputValues.letters are NOT empty - should call updateInputValues with props.inputValues sliced of the last characters', () => {
        wrapper.setProps({inputValues: {numbers: '23', letters: 'ad'}})
        wrapper.instance().handleEraseClick();
        expect(props.updateInputValues).toHaveBeenCalledWith({numbers: '2', letters: 'a'});
    });
    it('calling handleEraseClick - while props.inputValues.letters are empty - should call deleteWord', () => {
        wrapper.setProps({inputValues: {numbers: '', letters: ''}})
        wrapper.instance().handleEraseClick();
        expect(props.deleteWord).toHaveBeenCalled();
    });
    it('calling handleNumberClick - with 6 and m - should call updateInputValues with current input values extended by 6 and m', () => {
        wrapper.setProps({inputValues: {numbers: '', letters: ''}})
        wrapper.instance().handleNumberClick('6', 'm');
        expect(props.updateInputValues).toHaveBeenCalledWith({numbers: '6', letters: 'm'});
        wrapper.setProps({inputValues: {numbers: '2', letters: 'a'}})
        wrapper.instance().handleNumberClick('6', 'm');
        expect(props.updateInputValues).toHaveBeenCalledWith({numbers: '26', letters: 'am'});
        
    });
})
