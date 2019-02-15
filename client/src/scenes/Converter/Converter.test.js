import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Converter from './Converter';
import DisplayMessages from './components/DisplayMessages/DisplayMessages';
import DisplayInput from './components/DisplayInput/DisplayInput';
import Suggestions from './components/Suggestions/Suggestions';
import Keyboard from './components/Keyboard/Keyboard';

configure({adapter: new Adapter()});

describe('<Converter />', () => {

    const setup = propOverrides => {
        const props = Object.assign({
            inputValues: {
                numbers: '2',
                letters: 'a'
            },
            addWord: jest.fn(),
            deleteWord: jest.fn(),
            updateInputValues: jest.fn()
        }, propOverrides)

        const wrapper = shallow(<Converter {...props} />)

        const fetchSuggestions = wrapper.instance().fetchSuggestions = jest.fn();

        return {
            props,
            wrapper,
            fetchSuggestions,
            displayMessages() {
                return wrapper.update().find(DisplayMessages)
            },
            displayInput() {
                return wrapper.update().find(DisplayInput)
            },
            keyboard() {
                return wrapper.update().find(Keyboard)
            },
            suggestions() {
                return wrapper.update().find(Suggestions)
            }
        }
    }

    // rendering

    it('renders DisplayMessages component', () => {
        const { displayMessages } = setup();
        expect(displayMessages()).toHaveLength(1);
    });

    it('renders DisplayInput component', () => {
        const { displayInput } = setup();
        expect(displayInput()).toHaveLength(1);
    });

    it('renders Suggestions component', () => {
        const { suggestions } = setup();
        expect(suggestions()).toHaveLength(1);
    });

    it('renders Keyboard component', () => {
        const { keyboard } = setup();
        expect(keyboard()).toHaveLength(1);
    });

    // methods

    it('calling updateInputValues: 1) will result in new values being sent as props to DisplayInput and Keyboard', () => {
        const { wrapper, displayInput, keyboard } = setup();
        const newValues = {numbers: '78', letters: 'pt'};
        wrapper.instance().updateInputValues(newValues);
        expect(displayInput().props().inputValues).toEqual(newValues);
        expect(keyboard().props().inputValues).toEqual(newValues);
    });

    it('calling updateInputValues: 2) with new values should call fetchSuggestions', () => {     
        const { wrapper, suggestions, fetchSuggestions } = setup();
        const newValues = {numbers: '78', letters: 'pt'};
        wrapper.setState({suggestions: ['notEmpty']});
        wrapper.instance().updateInputValues(newValues);
        expect(fetchSuggestions).toHaveBeenCalledWith(newValues.numbers);
        expect(suggestions().props().suggestions).toEqual(['notEmpty']);
    });

    it('calling updateInputValues: 3) with empty new values should pass empty suggestions as props to Suggestions component', () => {
        const { wrapper, suggestions, fetchSuggestions } = setup();
        const newValues = {numbers: '', letters: ''};
        wrapper.setState({suggestions: ['notEmpty']});
        wrapper.instance().updateInputValues(newValues);
        expect(fetchSuggestions).not.toHaveBeenCalled();
        expect(suggestions().props().suggestions).toEqual([]);
    });

    it('calling addWord: 1) will concatenate the passed string to state.currentMessage and add an empty space at the end', () => {
        const { wrapper, displayInput } = setup();
        wrapper.setState({currentMessage: ''});
        wrapper.instance().addWord('word');
        expect(displayInput().props().currentMessage).toEqual('word ');
        wrapper.setState({currentMessage: 'hello '});
        wrapper.instance().addWord('word');
        expect(displayInput().props().currentMessage).toEqual('hello word ');
    });

    it('calling addWord: 2) will reset the props for the dependant components', () => {
        const { wrapper, displayInput, keyboard, suggestions } = setup();
        const emptyValues = {numbers: '', letters: ''};
        const state = {
            inputValues: {numbers: 'notEmpty', letters: 'notEmpty'},
            suggestions: ['notEmpty']
        }
        wrapper.setState({...state});
        wrapper.instance().addWord('word');
        expect(displayInput().props().inputValues).toEqual(emptyValues);
        expect(keyboard().props().inputValues).toEqual(emptyValues);
        expect(suggestions().props().suggestions).toEqual([]);
    });

    it('calling deleteWord: 1) - while state.currentMessage ends with an empty string - will slice the current message of the empty string', () => {
        const { wrapper, displayInput } = setup();
        wrapper.setState({currentMessage: 'hello '});
        wrapper.instance().deleteWord();
        expect(displayInput().props().currentMessage).toEqual('hello');
    });

    it('calling deleteWord: 2)- while state.currentMessage does NOT end with an empty string - will remove the last word from the current message', () => {
        const { wrapper, displayInput } = setup();
        wrapper.setState({currentMessage: 'hello word'});
        wrapper.instance().deleteWord();
        expect(displayInput().props().currentMessage).toEqual('hello ');
        wrapper.setState({currentMessage: 'hello'});
        wrapper.instance().deleteWord();
        expect(displayInput().props().currentMessage).toEqual('');
    });

    it('calling submitMessage should add currentMessage to the messages and reset inputValues, currentMessage, and suggestions', () => {
        const { wrapper, displayMessages, displayInput, keyboard, suggestions } = setup();
        const emptyValues = {numbers: '', letters: ''};        
        const state = {
            messages: [{position: 'left', text: 'first message'}],
            currentMessage: 'second message ',
            inputValues: {numbers: 'someInput', letters: 'someInput'},
            suggestions: ['notEmpty']
        };
        wrapper.setState({...state});
        wrapper.instance().submitMessage();
        expect(displayMessages().props().messages).toEqual([
                {position: 'left', text: 'first message'},
                {position: 'right', text: 'second message someInput'}
        ]);
        expect(displayInput().props().inputValues).toEqual(emptyValues);
        expect(displayInput().props().currentMessage).toEqual('');        
        expect(keyboard().props().inputValues).toEqual(emptyValues);      
        expect(suggestions().props().suggestions).toEqual([]);
    });
})
       
