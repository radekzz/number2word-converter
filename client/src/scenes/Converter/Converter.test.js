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

    const fetchSuggestionsMethod = jest.spyOn(Converter.prototype, 'fetchSuggestions');
    const setStateMethod = jest.spyOn(Converter.prototype, 'setState');

    beforeEach(() => {
        wrapper = shallow(<Converter />);
        wrapper.instance().fetchSuggestions = jest.fn();
        wrapper.instance().setState = jest.fn();
        wrapper.update();
    });

    // rendering

    it('renders DisplayMessages component', () => {
        expect(wrapper.find(DisplayMessages)).toHaveLength(1);
    });

    it('renders DisplayInput component', () => {
        expect(wrapper.find(DisplayInput)).toHaveLength(1);
    });

    it('renders Suggestions component', () => {
        expect(wrapper.find(Suggestions)).toHaveLength(1);
    });

    it('renders Keyboard component', () => {
        expect(wrapper.find(Keyboard)).toHaveLength(1);
    });

    // methods

    it('calling updateInputValues: 1) will result in new values being sent as props to DisplayInput and Keyboard', () => {
        const newValues = {numbers: '78', letters: 'pt'};
        wrapper = shallow(<Converter />);
        wrapper.instance().fetchSuggestions = jest.fn();
        wrapper.instance().updateInputValues(newValues);
        expect(wrapper.update().find(DisplayInput).props().inputValues).toEqual(newValues)
        expect(wrapper.update().find(Keyboard).props().inputValues).toEqual(newValues)
    });

    it('calling updateInputValues: 2) with new values should call fetchSuggestions', () => {
        const newValues = {numbers: '78', letters: 'pt'};
        wrapper = shallow(<Converter />);
        wrapper.setState({suggestions: ['notEmpty']})
        wrapper.instance().fetchSuggestions = jest.fn();
        wrapper.instance().updateInputValues(newValues);
        expect(wrapper.instance().fetchSuggestions).toHaveBeenCalledWith(newValues.numbers);
        expect(wrapper.update().find(Suggestions).props().suggestions).toEqual(['notEmpty'])        
    });

    it('calling updateInputValues: 3) with empty new values should pass empty suggestions as props to Suggestions component', () => {
        const newValues = {numbers: '', letters: ''};
        wrapper = shallow(<Converter />);
        wrapper.setState({suggestions: ['notEmpty']})
        wrapper.instance().fetchSuggestions = jest.fn();
        wrapper.instance().updateInputValues(newValues);
        expect(wrapper.instance().fetchSuggestions).not.toHaveBeenCalled();
        expect(wrapper.update().find(Suggestions).props().suggestions).toEqual([]);
    });

    it('calling addWord: 1) will concatenate the passed string to state.currentMessage and add an empty space at the end', () => {
        wrapper = shallow(<Converter />);
        wrapper.setState({currentMessage: ''})
        wrapper.instance().addWord('word');
        expect(wrapper.update().find(DisplayInput).props().currentMessage).toEqual('word ');
        wrapper.setState({currentMessage: 'hello '});
        wrapper.instance().addWord('word');
        expect(wrapper.update().find(DisplayInput).props().currentMessage).toEqual('hello word ');
    });

    it('calling addWord: 2) will reset the props for the dependant components', () => {
        const emptyValues = {numbers: '', letters: ''};
        const state = {
            inputValues: {numbers: 'notEmpty', letters: 'notEmpty'},
            suggestions: ['notEmpty']
        }
        wrapper = shallow(<Converter />);
        wrapper.setState({...state});
        wrapper.instance().addWord('word');
        expect(wrapper.update().find(DisplayInput).props().inputValues).toEqual(emptyValues);
        expect(wrapper.update().find(Keyboard).props().inputValues).toEqual(emptyValues)  ;      
        expect(wrapper.update().find(Suggestions).props().suggestions).toEqual([]);
    });

    it('calling deleteWord: 1) - while state.currentMessage ends with an empty string - will slice the current message of the empty string', () => {
        wrapper = shallow(<Converter />);
        wrapper.setState({currentMessage: 'hello '});
        wrapper.instance().deleteWord();
        expect(wrapper.update().find(DisplayInput).props().currentMessage).toEqual('hello');
    });

    it('calling deleteWord: 2)- while state.currentMessage does NOT end with an empty string - will remove the last word from the current message', () => {
        wrapper = shallow(<Converter />);
        wrapper.setState({currentMessage: 'hello word'});
        wrapper.instance().deleteWord();
        expect(wrapper.update().find(DisplayInput).props().currentMessage).toEqual('hello ');
        wrapper.setState({currentMessage: 'hello'});
        wrapper.instance().deleteWord();
        expect(wrapper.update().find(DisplayInput).props().currentMessage).toEqual('');
    });

    it('calling submitMessage should add currentMessage to the messages and reset inputValues, currentMessage, and suggestions', () => {
        const emptyValues = {numbers: '', letters: ''};        
        const state = {
            messages: [{position: 'left', text: 'first message'}],
            currentMessage: 'second message ',
            inputValues: {numbers: 'someInput', letters: 'someInput'},
            suggestions: ['notEmpty']
        }
        wrapper = shallow(<Converter />);
        wrapper.setState({...state});
        wrapper.instance().submitMessage();
        expect(wrapper.update().find(DisplayMessages)
            .props().messages)
            .toEqual([
                {position: 'left', text: 'first message'},
                {position: 'right', text: 'second message someInput'}
            ]);
        expect(wrapper.update().find(DisplayInput).props().inputValues).toEqual(emptyValues);
        expect(wrapper.update().find(DisplayInput).props().currentMessage).toEqual('');        
        expect(wrapper.update().find(Keyboard).props().inputValues).toEqual(emptyValues)  ;      
        expect(wrapper.update().find(Suggestions).props().suggestions).toEqual([]);
    });
})
       
