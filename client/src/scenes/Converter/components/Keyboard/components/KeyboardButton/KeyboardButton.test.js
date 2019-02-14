import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import KeyboardButton from './KeyboardButton';

configure({adapter: new Adapter()});

describe('<KeyboardButton />', () => {
    let wrapper;

    const props = {
        buttonKey: '2',
        letters: ['a','b','c'],
        onKeyboardClick: jest.fn(),
    }

    beforeEach(() => {
        wrapper = shallow(<KeyboardButton {...props} />);
    });

    it('renders a button element', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });

    it('onClick calls props.onKeyboardClick', () => {
        wrapper.simulate('click');
        expect(props.onKeyboardClick).toHaveBeenCalledWith(props.buttonKey);
    })
})

    
